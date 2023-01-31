import React, { useState } from "react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import DetailTask from "../detailTask/DetailTask";
import { getDailyTasks } from "../../function/getDailyTasks";
import { useTasksContext } from "../../contexts/tasksContext";

const DailyCalendar: React.FC = () => {
  // 画面表示
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const { tasks, subTasks } = useTasksContext();
  let dailyTasks: Task[] = [];
  dailyTasks = getDailyTasks(tasks, subTasks);
  // タスクバークリック時、ツリーを表示
  const onSelect = (parentTaskId: string) => {
    setSelectedTitle(parentTaskId);
    setShowDetail(true);
  };
  return (
    <div className="scroll">
      {selectedTitle !== null && selectedTitle !== "" ? (
        <DetailTask
          showFlag={showDetail}
          setShowModal={setShowDetail}
          parentTitle={selectedTitle}
        />
      ) : (
        <></>
      )}
      <h1>Daily Calendar</h1>
      {dailyTasks.length !== 0 ? (
        <Gantt
          tasks={dailyTasks}
          viewMode={ViewMode.QuarterDay}
          todayColor="rgb(250,246,225)"
          barFill={80}
          listCellWidth="180px"
          onSelect={(e) => onSelect(e.project || e.id)}
          onExpanderClick={() => setShowDetail(true)}
        />
      ) : (
        <p>登録されているタスクはありません。</p>
      )}
    </div>
  );
};

export default DailyCalendar;
