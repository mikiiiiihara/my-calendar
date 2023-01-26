import React, { useState } from "react";
import { DisplayType, DISPLAY_TYPE } from "../../consts/DisplayType";
import { auth } from "../../firebase";
import DailyCalendar from "../calendar/DailyCalendar";
import WeeklyCalendar from "../calendar/WeeklyCalendar";

const Home: React.FC = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DISPLAY_TYPE.weekly
  );
  return (
    <div>
      <div className="nav">
        <button className="nav-button" onClick={() => auth.signOut()}>
          Logout
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
      {displayType === DISPLAY_TYPE.weekly ? (
        <WeeklyCalendar />
      ) : (
        <DailyCalendar />
      )}
    </div>
  );
};

export default Home;
