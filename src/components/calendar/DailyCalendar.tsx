import React, { useCallback, useState } from "react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import DetailTask from "../detailTask/DetailTask";
import { getDailyTasks } from "../../function/getDailyTasks";
import { useTasksContext } from "../../contexts/tasksContext";
import CreateTask from "../createTask/CreateTask";

const DailyCalendar: React.FC = () => {
  // 画面表示
  const [showDetail, setShowDetail] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const { tasks, subTasks } = useTasksContext();
  let dailyTasks: Task[] = [];
  dailyTasks = getDailyTasks(tasks, subTasks);
  // タスクバークリック時、ツリーを表示
  const onSelect = useCallback((parentTaskId: string) => {
    setSelectedTitle(parentTaskId);
    setShowDetail(true);
  }, []);
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
      <CreateTask
        showFlag={showCreateModal}
        setShowModal={setShowCreateModal}
        start={new Date()}
        end={new Date()}
      />
      <h1>Daily Calendar</h1>
      <div className="nav">
        <button className="add-button" onClick={() => setShowCreateModal(true)}>
          Create a new task
        </button>
      </div>
      <label className="Switch_Toggle">
        <input
          type="checkbox"
          defaultChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
        />
      </label>
      Show Task List
      {dailyTasks.length !== 0 ? (
        <Gantt
          tasks={dailyTasks}
          viewMode={ViewMode.QuarterDay}
          todayColor="rgb(250,246,225)"
          barFill={80}
          listCellWidth={isChecked ? "180px" : ""}
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
