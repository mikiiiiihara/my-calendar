import React, { useState } from "react";
import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import DetailTask from "../detailTask/DetailTask";
import { useTasks } from "../../hooks/useTasks";
import { getDailyTasks } from "../../function/getDailyTasks";

const DailyCalendar: React.FC = () => {
  // 画面表示
  const [showDetail, setShowDetail] = useState(false);
  const { getTasks, getSubTasks } = useTasks();
  const tasks = getTasks();
  const subTasks = getSubTasks();
  const dailyTasks = getDailyTasks(tasks, subTasks);
  return (
    <div className="scroll">
      <DetailTask showFlag={showDetail} setShowModal={setShowDetail} />
      <h1>Daily Calendar</h1>
      <Gantt
        tasks={dailyTasks}
        viewMode={ViewMode.Hour}
        todayColor="rgb(250,246,225)"
        barFill={80}
        listCellWidth="180px"
        onSelect={() => setShowDetail(true)}
        onExpanderClick={() => setShowDetail(true)}
      />
    </div>
  );
};

export default DailyCalendar;
