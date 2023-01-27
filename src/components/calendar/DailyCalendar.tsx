import React, { useState } from "react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import DetailTask from "../detailTask/DetailTask";

// TODO: 今日の日付以降（１週間とかかな）でfilterしてデータ作成して表示させたい
const currentDate = new Date();
const tasks: Task[] = [
  {
    start: currentDate,
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 2
    ),
    name: "航空券取る",
    id: "ProjectSample",
    progress: 100,
    type: "project",
    hideChildren: false,
    displayOrder: 1,
    styles: {
      backgroundColor: "#ff6347",
      progressColor: "#ff6347",
    },
  },
  {
    start: currentDate,
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    ),
    name: "　Skyscannerで探す",
    id: "Task 0",
    progress: 100,
    type: "task",
    project: "ProjectSample",
    displayOrder: 2,
    styles: {
      backgroundColor: "#4169e1",
      progressColor: "#4169e1",
    },
  },
  {
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 2
    ),
    name: "　予約する",
    id: "Task 1",
    progress: 100,
    type: "task",
    project: "ProjectSample",
    displayOrder: 3,
    styles: {
      backgroundColor: "#4169e1",
      progressColor: "#4169e1",
    },
  },
  {
    start: currentDate,
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 3
    ),
    name: "韓国に旅行する",
    id: "ProjectSample2",
    progress: 100,
    type: "project",
    hideChildren: false,
    displayOrder: 4,
    styles: {
      backgroundColor: "#ff6347",
      progressColor: "#ff6347",
    },
  },
  {
    start: currentDate,
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    ),
    name: "　カジノで大勝ちする",
    id: "Task 0",
    progress: 100,
    type: "task",
    project: "ProjectSample2",
    displayOrder: 5,
    styles: {
      backgroundColor: "#4169e1",
      progressColor: "#4169e1",
    },
  },
  {
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 3
    ),
    name: "　サムギョプサルを食べる",
    id: "Task 1",
    progress: 100,
    type: "task",
    project: "ProjectSample2",
    displayOrder: 6,
    styles: {
      backgroundColor: "#4169e1",
      progressColor: "#4169e1",
    },
  },
];
const DailyCalendar: React.FC = () => {
  // 画面表示
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="scroll">
      <DetailTask showFlag={showDetail} setShowModal={setShowDetail} />
      <h1>Daily Calendar</h1>
      <Gantt
        tasks={tasks}
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
