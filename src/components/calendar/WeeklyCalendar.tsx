import React, { useCallback, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import DetailTask from "../detailTask/DetailTask";

type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
};

// TODO: useContextで管理する
const events: Event[] = [
  {
    id: "1",
    title: "航空券取る - Skyscannerで探す",
    start: "2023-01-24 10:00:00",
    end: "2023-01-25 10:00:00",
    backgroundColor: "#ff6347",
  },
  {
    id: "2",
    title: "航空券取る - 予約する",
    start: "2023-01-25 10:00:00",
    end: "2023-01-26 11:00:00",
    backgroundColor: "#4169e1",
  },
  {
    id: "3",
    title: "韓国に旅行する - 　カジノで大勝ちする",
    start: "2023-01-26 10:00:00",
    end: "2023-01-26 14:00:00",
    backgroundColor: "#ffd700",
  },
  {
    id: "3",
    title: "韓国に旅行する - 　サムギョプサルを食べる",
    start: "2023-01-26 14:00:00",
    end: "2023-01-26 18:00:00",
    backgroundColor: "#3cb371",
  },
];

const WeeklyCalendar: React.FC = () => {
  // 画面表示
  const [showDetail, setShowDetail] = useState(false);
  const handleSelectClick = useCallback((arg: DateSelectArg) => {
    console.log(arg);
    const calendarApi = arg.view.calendar;
    calendarApi.unselect(); // 選択した部分の選択を解除
  }, []);
  const handleEventClick = useCallback((arg: EventClickArg) => {
    setShowDetail(true);
    console.log(arg.event.id);
    console.log(arg.event.title);
  }, []);
  return (
    <div>
      <DetailTask showFlag={showDetail} setShowModal={setShowDetail} />
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
        events={events}
        select={handleSelectClick} // カレンダー範囲選択時
        eventClick={handleEventClick} // イベントクリック時
      />
    </div>
  );
};

export default WeeklyCalendar;
