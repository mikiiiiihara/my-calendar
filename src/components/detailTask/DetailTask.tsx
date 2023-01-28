import React from "react";
import { useTasksContext } from "../../contexts/tasksContext";
import styles from "./DetailTask.module.css";

type Props = {
  showFlag: Boolean;
  setShowModal: Function;
  selectedTitle?: string;
};

const DetailTask: React.FC<Props> = ({
  showFlag,
  setShowModal,
  selectedTitle,
}) => {
  const { tasks, subTasks } = useTasksContext();
  const closeModal = () => {
    setShowModal(false);
  };
  if (selectedTitle !== "" && selectedTitle !== undefined) {
    const selectedTask = tasks.find((task) => task.title === selectedTitle);
    // 選択した親タスクがない場合、アラート出す
    if (selectedTask == null)
      throw new Error("親子タスクの紐付けを確認できませんでした。");
    const selectedSubTasks = subTasks.filter(
      (subTask) => subTask.parentTask === selectedTitle
    );
    return (
      <>
        {showFlag ? ( // showFlagがtrueだったらModalを表示する
          <div className={styles.overlay}>
            <div className={styles.card}>
              <div className={styles.content}>
                <h1>{selectedTask.title}</h1>
                <p>
                  期間：{selectedTask.start.toISOString()} -{" "}
                  {selectedTask.end.toISOString()}
                </p>
                <ul>
                  {selectedSubTasks ? (
                    selectedSubTasks.map((subTask) => (
                      <li key={subTask.id}>
                        <h2>{subTask.title}</h2>
                        <p>ステータス：{subTask.status}</p>
                        <p>
                          期間：{subTask.start.toISOString()} -{" "}
                          {subTask.end.toISOString()}
                        </p>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
              <button onClick={closeModal} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        ) : (
          <></> // showFlagがfalseの場合はModalは表示しない
        )}
      </>
    );
  }
  return <></>;
};

export default DetailTask;
