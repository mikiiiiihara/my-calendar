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
import { CalendarTask } from "../../types/calendar-task";

const WeeklyCalendar: React.FC = () => {
  const { tasks, subTasks, option } = useTasksContext();
  let weeklyTasks: CalendarTask[] = [];
  // サブタスクが空の場合、計算しない
  if (subTasks.length !== 0) {
    weeklyTasks = getWeeklyTasks(tasks, subTasks, option.statusTypeList || []);
  }
  // 画面表示
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [start, setStart] = useState<Date | undefined>(undefined);
  const [end, setEnd] = useState<Date | undefined>(undefined);
  // カレンダーのクリックから、新規登録画面を表示
  const handleSelectClick = useCallback((arg: DateSelectArg) => {
    setStart(arg.start);
    setEnd(arg.end);
    // 新規追加画面を表示
    setShowCreateModal(true);
    const calendarApi = arg.view.calendar;
    calendarApi.unselect(); // 選択した部分の選択を解除
  }, []);

  // 新規登録ボタンから、新規登録画面を表示
  const selectClick = useCallback(() => {
    setStart(new Date());
    setEnd(new Date());
    // 新規追加画面を表示
    setShowCreateModal(true);
  }, []);

  // カレンダーのイベントクリックから、詳細画面を表示
  const handleEventClick = useCallback(
    (arg: EventClickArg) => {
      // 選択した子タスクを取得
      const selectedTask = subTasks.find(
        (subTask) => subTask.id === arg.event.id
      );
      if (selectedTask == null)
        throw new Error("選択した子タスクを確認できませんでした。");
      // 選択した子タスクの親タスク名をセット
      setSelectedTitle(selectedTask.parentTaskId);
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
          parentTitle={selectedTitle}
        />
      ) : (
        <></>
      )}
      <CreateTask
        showFlag={showCreateModal}
        setShowModal={setShowCreateModal}
        start={start || new Date()}
        end={end || new Date()}
      />
      <h1>Weekly Calendar</h1>
      <div className="nav">
        <button className="add-button" onClick={selectClick}>
          Create a new task
        </button>
      </div>
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
