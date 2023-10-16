import { BaselineIcon } from "lucide-react";
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
  const doneTasks = tasks.filter((task) => task.done).length; // TODO: Filter the tasks that are done if needed
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleToDoTasks(){
    const res = await fetch(BASE_URL,{
      method:"GET",
    });
    const toDoTasks = tasks.filter((task) => task.done !== situation);
    setTasks(toDoTasks);
  }

  return (
    <div>
      <main>
        <TaskForm onSubmit={handleSubmit} />

      <div>
        <p>Filtrar tarefas concluídas</p>
        <input type="checkbox" onChange={handleToDoTasks} ></input>
      </div>

      <ul className={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task) =>(
            <ListTask
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onCheckedChange={handleCheckChange}
              done={doneTasks}
              numberOfTasks={tasks.length}
            />
          ))
        ) : isLoading ? (
          <p></p>
        ) : (
          <p>Não há nenhuma tarefa na lista</p>
        )}
      </ul>
      </main>
    </div>
  );
}

export default App;
