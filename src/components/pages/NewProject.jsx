import { useNavigate } from "react-router-dom";
import styles from "./NewProject.module.css";
import ProjectForm from "../project/ProjectForm";

export default function NewProject() {
    const navigate = useNavigate();

    function createPost(project) {
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                navigate("/projects", {state: {message: "Projeto criado com sucesso!"}})
            })
            .catch((error) => console.log(error));
    }
    
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar" />
        </div>
    );
}
