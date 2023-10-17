import { useEffect, useState } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitBtn from "../form/SubmitBtn";
import styles from "./ProjectForm.module.css";

export default function ProjectForm({handleSubmit, btnText, projectData}) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((error) => console.log(error));
    }, []);

    function submit(event) {
        event.preventDefault();
        handleSubmit(project);
    }

    function handleChange(event) {
        setProject({...project, [event.target.name]: event.target.value});
    }

    function handleCategory(event) {
        setProject({...project, category: {
            id: event.target.value,
            name: event.target.options[event.target.selectedIndex].text
        }});
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input
                type="text"
                name="name"
                placeholder="Insira o nome do projeto"
                value={project.name ? project.name : ""}
                text="Nome"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                name="budget"
                placeholder="Insira o orçamento total"
                value={project.budget ? project.budget : ""}
                text="Orçamento"
                handleOnChange={handleChange}
            />
            <Select
                name="category_id"
                options={categories}
                value={project.category ? project.category.id : ""}
                text="Categoria"
                handleOnChange={handleCategory}
            />
            <SubmitBtn text={btnText} />
        </form>
    );
}