import React, { useCallback, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import DetailTask from "../detailTask/DetailTask";
import { getWeeklyTasks } from "../../function/getWeeklyTasks";
import { useTasksContext } from "../../contexts/tasksContext";
import CreateTask from "../createTask/CreateTask";

const WeeklyCalendar: React.FC = () => {
  const { tasks, subTasks } = useTasksContext();
  const weeklyTasks = getWeeklyTasks(tasks, subTasks);
  // 画面表示
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleSelectClick = useCallback((arg: DateSelectArg) => {
    console.log(arg);
    // 新規追加画面を表示
    setShowCreateModal(true);
    const calendarApi = arg.view.calendar;
    calendarApi.unselect(); // 選択した部分の選択を解除
  }, []);
  const handleEventClick = useCallback(
    (arg: EventClickArg) => {
      // 選択した子タスクの親タスクを取得
      const selectedTask = subTasks.find(
        (subTask) => subTask.id === arg.event.id
      );
      if (selectedTask == null)
        throw new Error("選択した子タスクを確認できませんでした。");
      setSelectedTitle(selectedTask.parentTask);
      setShowDetail(true);
    },
    [subTasks]
  );
  return (
    <div>
      {selectedTitle !== null && selectedTitle !== "" ? (
        <DetailTask
          showFlag={showDetail}
          setShowModal={setShowDetail}
          selectedTitle={selectedTitle}
        />
      ) : (
        <></>
      )}
      <CreateTask
        showFlag={showCreateModal}
        setShowModal={setShowCreateModal}
      />
      <h1>Weekly Calendar</h1>
      <FullCalendar
        slotDuration="00:30:00" // 表示する時間軸の最小値
        selectable={true} // 日付選択可能
        titleFormat={{
          year: "numeric",
          month: "short",
          day: "numeric",
        }}
        // タイトルに年月日を表示
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "",
        }}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "0:00",
          endTime: "24:00",
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={weeklyTasks}
        select={handleSelectClick} // カレンダー範囲選択時
        eventClick={handleEventClick} // イベントクリック時
      />
    </div>
  );
};

export default WeeklyCalendar;
