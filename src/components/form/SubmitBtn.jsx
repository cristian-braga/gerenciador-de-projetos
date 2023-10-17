import styles from "./SubmitBtn.module.css";

export default function SubmitBtn({text}) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    );
}