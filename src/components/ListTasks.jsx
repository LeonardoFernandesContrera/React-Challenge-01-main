import {Trash2} from "lucide-react";
import styles from "./ListTasks.module.css";

function ListTask({task, onDelete, onCheckedChange }){
    function handleChange(event){
        onCheckedChange(task.id,event.target.checked);
    }


    return(
        <li className={styles.task}>
            <input type="checkbox" checked={task.done} onChange={handleChange}/>

            <div>
                <p>{task.text}</p>
            </div>

            <button onClick={() => onDelete(task.id)}>
                <Trash2 size={16}></Trash2>
            </button>
        </li>
    )
}

export default ListTask;