import {Trash2} from "lucide-react";
import styles from "./ListTasks.module.css";

function ListTask({task, onDelete, onCheckedChange }){
    function handleChange(event){
        onCheckedChange(task.id,event.target.checked);
    }


    return(
        <li className={styles.task}>
            <div className={styles.div}>
                <input type="checkbox" id={task.id} checked={task.done} onChange={handleChange}/>
                <label htmlFor={task.id} >{task.text}</label>
            </div>
            <button className={styles.trash} onClick={() => onDelete(task.id)}>
                <Trash2 size={16}></Trash2>
            </button>
        </li>
    )
}

export default ListTask;