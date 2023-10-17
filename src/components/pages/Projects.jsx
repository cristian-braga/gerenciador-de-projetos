import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import styles from "./Projects.module.css";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState("");

    const location = useLocation();
    let message = "";

    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setProjects(data);
                    setRemoveLoading(true);
                })
                .catch((error) => console.log(error));
        }, 500);
    });

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id));
                setProjectMessage("Projeto removido com sucesso!");
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" message={message} />}
            {projectMessage && <Message type="success" message={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Nâo há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    );
}