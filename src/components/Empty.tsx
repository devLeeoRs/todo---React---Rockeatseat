import { ClipboardText } from "@phosphor-icons/react";

import styles from "./Empty.module.css";

export function Empty() {
  return (
    <div className={styles.emptyTaskList}>
      <ClipboardText size={56} />
      <h4>Voçê ainda não tem tarefas cadastradas</h4>
      <p>Crie tarefas e organize seus itens a fazer </p>
    </div>
  );
}
