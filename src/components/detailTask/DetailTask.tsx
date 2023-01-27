import React from "react";
import styles from "./DetailTask.module.css";

type Props = {
  showFlag: Boolean;
  setShowModal: Function;
};

const DetailTask: React.FC<Props> = ({ showFlag, setShowModal }) => {
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div className={styles.overlay}>
          <div className={styles.card}>
            <div className={styles.content}>
              <h1>航空券取る</h1>
              <p>期間：2023/01/24 10:00 - 2023/01/26 11:00</p>
              <ul>
                <li>
                  <p>Skyscannerで探す</p>
                  <p>期間：2023/01/24 10:00 - 2023/01/25 10:00</p>
                </li>
                <li>
                  <p>予約する</p>
                  <p>期間：2023/01/25 10:00 - 2023/01/26 11:00</p>
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

export default DetailTask;
