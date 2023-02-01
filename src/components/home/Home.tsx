import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { DisplayType, DISPLAY_TYPE } from "../../consts/DisplayType";
import { auth } from "../../firebase";
import DailyCalendar from "../calendar/DailyCalendar";
import MonthlyCalendar from "../calendar/MonthlyCalendar";
import WeeklyCalendar from "../calendar/WeeklyCalendar";
import StatusBar from "../statusBar/StatusBar";

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
        <Button
          variant="contained"
          style={{
            width: 80,
            height: 40,
            backgroundColor: "rgb(48, 61, 78)",
            color: "white",
          }}
          onClick={signOut}
        >
          Logout
        </Button>
        <Button
          variant="contained"
          style={{
            width: 80,
            height: 40,
            margin: 4,
            backgroundColor: "rgb(48, 61, 78)",
            color: "white",
          }}
          onClick={() => setDisplayType(DISPLAY_TYPE.monthly)}
        >
          monthly
        </Button>
        <Button
          variant="contained"
          style={{
            width: 80,
            height: 40,
            margin: 4,
            backgroundColor: "rgb(48, 61, 78)",
            color: "white",
          }}
          onClick={() => setDisplayType(DISPLAY_TYPE.weekly)}
        >
          weekly
        </Button>
        <Button
          variant="contained"
          style={{
            width: 80,
            height: 40,
            margin: 4,
            backgroundColor: "rgb(48, 61, 78)",
            color: "white",
          }}
          onClick={() => setDisplayType(DISPLAY_TYPE.daily)}
        >
          daily
        </Button>
      </div>
      <StatusBar />
      {displayType === DISPLAY_TYPE.monthly ? <MonthlyCalendar /> : <></>}
      {displayType === DISPLAY_TYPE.weekly ? <WeeklyCalendar /> : <></>}
      {displayType === DISPLAY_TYPE.daily ? <DailyCalendar /> : <></>}
    </div>
  );
};

export default Home;
