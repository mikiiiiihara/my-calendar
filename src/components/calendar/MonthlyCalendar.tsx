import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useCallback, useState } from "react";
import { useTasksContext } from "../../contexts/tasksContext";
import { getMonthlyTasks } from "../../function/getMonthlyTasks";
import { CalendarTask } from "../../types/calendar-task";
import CreateTask from "../createTask/CreateTask";
import DetailTask from "../detailTask/DetailTask";

const MonthlyCalendar: React.FC = () => {
  const { tasks } = useTasksContext();
  let monthlyTasks: CalendarTask[] = [];
  if (tasks.length !== 0) {
    monthlyTasks = getMonthlyTasks(tasks);
  }
  // 画面表示
  const [showDetail, setShowDetail] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [start, setStart] = useState<Date | undefined>(undefined);
  const [end, setEnd] = useState<Date | undefined>(undefined);
  const handleSelectClick = useCallback((arg: DateSelectArg) => {
    setStart(arg.start);
    setEnd(arg.end);
    // 新規追加画面を表示
    setShowCreateModal(true);
    const calendarApi = arg.view.calendar;
    calendarApi.unselect(); // 選択した部分の選択を解除
  }, []);
  const handleEventClick = useCallback((arg: EventClickArg) => {
    setSelectedId(arg.event.id);
    // // 選択した子タスクを取得
    // const selectedTask = tasks.find((subTask) => subTask.id === arg.event.id);
    // if (selectedTask == null)
    //   throw new Error("選択した子タスクを確認できませんでした。");
    // // 選択した子タスクの親タスク名をセット
    // setSelectedTitle(selectedTask.id);
    setShowDetail(true);
  }, []);
  return (
    <div>
      {selectedId !== null && selectedId !== "" ? (
        <DetailTask
          showFlag={showDetail}
          setShowModal={setShowDetail}
          parentTitle={selectedId}
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
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={monthlyTasks}
        select={handleSelectClick} // カレンダー範囲選択時
        eventClick={handleEventClick} // イベントクリック時
      />
    </div>
  );
};

export default MonthlyCalendar;
