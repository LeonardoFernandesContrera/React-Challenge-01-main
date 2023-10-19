import styles from "./TasksForm.module.css";
import {useRef, useState} from "react";

function TasksForm({onSubmit}){
    const inputRef = useRef(null);
    // const [text,setText] = useState("");

    async function handleSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const texto = formData.get("text");

        const verification = texto.trim();

        verification.length > 0 ? await onSubmit(texto) : alert("Não é possivel passar uma tarefa vazia")       

        event.target.reset()

        // const verification = text.trim()

        // verification.length > 0 ? await onSubmit(text) : alert("Não é possivel passar uma tarefa vazia")

        // setText("");
   
        inputRef.current.focus();
    }

    return( 
        <form 
            className={styles.Header} 
            onSubmit={(event) => handleSubmit(event) } >
                <h1 className={styles.label}>Minhas Tarefas</h1>
            <div className={styles.taskForm}> 
            <input
                name="text"
                ref={inputRef}
                placeholder="Passear com o cachorro"
                className={styles.input}
                type="text"
                id="text"
                // value={text}
                // onChange={(event) => setText(event.target.value)}}
                minLength={2}
                required
            />

            <button 
                type="submit"
                className={styles.button}
                aria-label="Criar Tarefa"
            >
                Criar Tarefa
            </button>
            </div>
        </form>
    )
}

export default TasksForm;