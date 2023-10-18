import styles from "./App.module.css";
import ListTask from "./components/ListTasks.jsx";
import TaskForm from "./components/TasksForm.jsx";
import {useEffect, useState} from "react";

const BASE_URL = "http://localhost:3333/tasks";

/**
 * Renders the whole application.
 * Lists all tasks and allows the user to create new ones.
 * @returns {JSX.Element}
 */
function App() {
  const [tasks, setTasks] = useState([]);
  // const [doneTasks, setDoneTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const filteredTasks = isChecked ? tasks.filter((task) => !task.done) : tasks

  //Hook

  useEffect(() =>{
    setIsLoading(true);
    fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) =>{
      setIsLoading(false);
      setTasks(data);
    });
  }, []);

  async function handleSubmit(text) {
    // TODO: Handle the form submission
    // Creates a new task in the database
    // Updates the list of tasks

    const res = await fetch(BASE_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({text, done: false}),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  }

  async function handleCheckChange(id, checked) {
    // TODO: Handle the checkbox change
    // Updates the `done` field of a task in the database
    // Updates the list of tasks
    const res = await fetch(BASE_URL + "/" + id,{
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ done: checked }),
    });

    const newTasks = tasks.map((task) => 
      task.id === id ? {...task, done: checked} : task
    );

    setTasks(newTasks);
  }

  async function handleDelete(id) {
    // TODO: Handle the delete button click of a task
    // Deletes a task from the database
    // Updates the list of tasks
    const res = await fetch(BASE_URL + "/" + id,{
      method: "DELETE",
    });
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <div>
      <main className={styles.main}>
        <TaskForm onSubmit={handleSubmit} />
        
    <div className={styles.filtrar}>
      <input id="filter" type="checkbox" onChange={() => setIsChecked(!isChecked)} />
      <label htmlFor="filter" >Filtrar tarefas concluídas {tasks.filter((task) => task.done).length} de {tasks.length} </label>
    </div>

      <ul>
        {tasks.length > 0 ? (
          filteredTasks.map((task) =>(
            <ListTask
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onCheckedChange={handleCheckChange}
            />
          ))
        ) : isLoading ? (
          <p></p>
        ) : (
          <p className={styles.taskList}>Não há nenhuma tarefa na lista</p>
        )}
      </ul>
      </main>
    </div>
  );
}

export default App;
