import React, { useState } from "react";
import { DisplayType, DISPLAY_TYPE } from "../../consts/DisplayType";
import { auth } from "../../firebase";
import DailyCalendar from "../calendar/DailyCalendar";
import MonthlyCalendar from "../calendar/MonthlyCalendar";
import WeeklyCalendar from "../calendar/WeeklyCalendar";

const Home: React.FC = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    // 月を初期表示にする
    DISPLAY_TYPE.monthly
  );
  const signOut = () => {
    if (window.confirm("ログアウトしますか？")) {
      auth.signOut();
    }
  };
  return (
    <div>
      <div className="nav">
        <button className="nav-button" onClick={signOut}>
          Logout
        </button>
        <button
          className="nav-button"
          onClick={() => setDisplayType(DISPLAY_TYPE.monthly)}
        >
          monthly
        </button>
        <button
          className="nav-button"
          onClick={() => setDisplayType(DISPLAY_TYPE.weekly)}
        >
          weekly
        </button>
        <button
          className="nav-button"
          onClick={() => setDisplayType(DISPLAY_TYPE.daily)}
        >
          daily
        </button>
      </div>
      {displayType === DISPLAY_TYPE.monthly ? <MonthlyCalendar /> : <></>}
      {displayType === DISPLAY_TYPE.weekly ? <WeeklyCalendar /> : <></>}
      {displayType === DISPLAY_TYPE.daily ? <DailyCalendar /> : <></>}
    </div>
  );
};

export default Home;
