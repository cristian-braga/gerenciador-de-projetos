import { useState } from "react";
import Input from "../form/Input";
import SubmitBtn from "../form/SubmitBtn";
import styles from "../project/ProjectForm.module.css";

export default function ServiceForm({handleSubmit, btnText, projectData}) {
    const [service, setService] = useState({});

    function submit(event) {
        event.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function handleChange(event) {
        setService({...service, [event.target.name]: event.target.value});
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input
                type="text"
                text="Nome"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
            />
            <SubmitBtn text={btnText} />
        </form>
    );
}