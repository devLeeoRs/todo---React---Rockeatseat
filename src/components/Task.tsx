import styles from "./Task.module.css";
import { Trash, Check } from "phosphor-react";

interface TaskProps {
  task: {
    id: string;
    description: string;
    isCheck: boolean;
  };
  handleTaskChecked: (id: string) => void; // Passando o id para a função
  deleteTask: (taskId: string) => void;
}

export function Task({ task, handleTaskChecked, deleteTask }: TaskProps) {
  function handleDeleteTask() {
    deleteTask(task.id);
  }

  return (
    <div className={styles.task}>
      <div
        onClick={() => handleTaskChecked(task.id)} // Passa o id da tarefa
        className={task.isCheck ? styles.checked : styles.notChecked}
      >
        {task.isCheck && <Check size={14} />}
      </div>
      <p className={task.isCheck ? styles.textChecked : ""}>
        {task.description}
      </p>
      <button onClick={handleDeleteTask} className={styles.delete}>
        <Trash size={14} />
      </button>
    </div>
  );
}
