import React from "react";
import { useTasks } from "../../hooks/useTasks";
import styles from "./DetailTask.module.css";

type Props = {
  showFlag: Boolean;
  setShowModal: Function;
};

const DetailTask: React.FC<Props> = ({ showFlag, setShowModal }) => {
  const { getTasks, getSubTasks } = useTasks();
  const tasks = getTasks();
  const subTasks = getSubTasks();
  const selectedTask = tasks.find((task) => task.title === "航空券取る");
  // 選択した親タスクがない場合、アラート出す
  if (selectedTask == null)
    throw new Error("親子タスクの紐付けを確認できませんでした。");
  const selectedSubTasks = subTasks.filter(
    (subTask) => subTask.parentTask === "航空券取る"
  );
  const closeModal = () => {
    setShowModal(false);
  };
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
};

export default DetailTask;
