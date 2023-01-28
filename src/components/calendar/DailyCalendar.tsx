import React, { useState } from "react";
import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import DetailTask from "../detailTask/DetailTask";
import { getDailyTasks } from "../../function/getDailyTasks";
import { useTasksContext } from "../../contexts/tasksContext";

const DailyCalendar: React.FC = () => {
  // 画面表示
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const { tasks, subTasks } = useTasksContext();
  const dailyTasks = getDailyTasks(tasks, subTasks);
  // タスクバーダブルクリック時、ツリーを表示
  const onSelect = (parentTask: string) => {
    setSelectedTitle(parentTask);
    setShowDetail(true);
  };
  return (
    <div className="scroll">
      {selectedTitle !== null && selectedTitle !== "" ? (
        <DetailTask
          showFlag={showDetail}
          setShowModal={setShowDetail}
          selectedTitle={selectedTitle}
        />
      ) : (
        <></>
      )}
      <h1>Daily Calendar</h1>
      <Gantt
        tasks={dailyTasks}
        viewMode={ViewMode.Hour}
        todayColor="rgb(250,246,225)"
        barFill={80}
        listCellWidth="180px"
        onSelect={(e) => onSelect(e.project || e.name)}
        onExpanderClick={() => setShowDetail(true)}
      />
    </div>
  );
};

export default DailyCalendar;
