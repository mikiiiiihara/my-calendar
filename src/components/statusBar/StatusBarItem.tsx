import React, { useState } from "react";
import { useTasksContext } from "../../contexts/tasksContext";
import { StatusType } from "../../types/option";

type Props = {
  statusType: StatusType;
};

const StatusBarItem: React.FC<Props> = ({ statusType }) => {
  const { name, color } = statusType;
  const { subTasks } = useTasksContext();
  // 画面項目
  const [isChecked, setIsChecked] = useState(true);
  // ソート
  const sortSubTasks = () => {
    console.log(name);
  };
  return (
    <>
      <span
        style={{
          backgroundColor: color,
          borderRadius: "4px",
          margin: "2px",
          color: "white",
          padding: "10px",
          textAlign: "center",
          display: "inline-block",
        }}
      >
        {name}
      </span>
    </>
  );
};

export default StatusBarItem;
