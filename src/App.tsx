import styles from "./App.module.css";
import { v4 as uuidv4 } from "uuid";

import { Empty } from "./components/Empty";
import { useState } from "react";

import { Header } from "./components/Header";
import { PlusCircle } from "@phosphor-icons/react";
import { Task } from "./components/Task";

export interface task {
  id: string;
  description: string;
  isCheck: boolean;
}

function App() {
  const [taskList, setTaskList] = useState<task[]>([]);
  const [taskInputValue, setTaskInputValue] = useState("");

  function handleNewTaskValue(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskInputValue(e.target.value);
  }

  function handleTaskChecked(taskId: string) {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCheck: !task.isCheck };
      }
      return task;
    });

    setTaskList(updatedTaskList);
  }

  function addNewTaskList() {
    if (taskInputValue.trim() === "") return;

    const newTask: task = {
      id: uuidv4(),
      description: taskInputValue,
      isCheck: false,
    };

    setTaskList([...taskList, newTask]);
    setTaskInputValue("");
  }

  function deleteTask(taskId: string) {
    const tasks = taskList.filter((task) => task.id !== taskId);

    setTaskList(tasks);
  }

  const taskCompleted = taskList.filter((task) => task.isCheck).length;

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.inputTask}>
          <input
            type="text"
            onChange={handleNewTaskValue}
            value={taskInputValue}
            placeholder="Adicione uma nova tarefa"
          />
          <button onClick={addNewTaskList}>
            Criar <PlusCircle size={20} />
          </button>
        </div>
        <main className={styles.taskList}>
          <div className={styles.infoTask}>
            <div className={styles.taskInfo}>
              Tarefas criadas
              <span> {taskList.length} </span>
            </div>
            <div className={styles.taskInfo}>
              Concluídas
              <span>
                {taskCompleted} de {taskList.length}
              </span>
            </div>
          </div>
          <div className={styles.listTasks}>
            {taskList.length === 0 && <Empty />}
            {taskList.length > 0 &&
              taskList.map((task) => (
                <Task
                  handleTaskChecked={handleTaskChecked}
                  deleteTask={deleteTask}
                  key={task.id}
                  task={task}
                />
              ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
