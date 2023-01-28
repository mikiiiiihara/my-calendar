import { useCallback, useEffect, useState } from "react";
import { SubTask } from "../types/sub-task";

export const useSubTasks = () => {
  /* subtasks */
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);

  /* actions */
  const fetchSubTasks = useCallback(async (): Promise<void> => {
    const currentDate = new Date();
    const subTasksData: SubTask[] = [
      {
        id: "1",
        start: currentDate,
        end: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        ),
        title: "Skyscannerで探す",
        parentTask: "航空券取る",
        status: "Done",
      },
      {
        id: "2",
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
        title: "予約する",
        parentTask: "航空券取る",
        status: "In Review",
      },
      {
        id: "3",
        start: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 3
        ),
        end: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 4
        ),
        title: "Q-CODEを入力する",
        parentTask: "韓国に旅行する",
        status: "In Progress",
      },
      {
        id: "4",
        start: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 4
        ),
        end: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 5
        ),
        title: "カジノで大勝ちする",
        parentTask: "韓国に旅行する",
        status: "Todo",
      },
      {
        id: "5",
        start: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 5
        ),
        end: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 6
        ),
        title: "サムギョプサルを食べる",
        parentTask: "韓国に旅行する",
        status: "Todo",
      },
    ];
    setSubTasks(subTasksData);
  }, []);

  useEffect(() => {
    fetchSubTasks();
  }, [fetchSubTasks]);

  return {
    subTasks,
  };
};
