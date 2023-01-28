import React from "react";
import styles from "../detailTask/DetailTask.module.css";

type Props = {
  showFlag: Boolean;
  setShowModal: Function;
};

const CreateTask: React.FC<Props> = ({ showFlag, setShowModal }) => {
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div className={styles.overlay}>
          <div className={styles.card}>
            <div className={styles.content}>
              <h1>タスク</h1>
              <p>期間：start - end</p>
              <ul>
                <li>
                  <h2>サブタスク</h2>
                  <p>ステータス：ステータス</p>
                  <p>期間：start - end</p>
                </li>
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

export default CreateTask;
