import { SubTask } from "../types/sub-task";
import { Task } from "../types/task";

export const useTasks = () => {
  const currentDate = new Date();
  const tasks: Task[] = [
    {
      id: "1",
      title: "航空券取る",
      start: currentDate,
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 2
      ),
      status: "In Review",
    },
    {
      id: "2",
      title: "韓国に旅行する",
      start: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 3
      ),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 6
      ),
      status: "Todo",
    },
  ];

  // 親タスクを返却
  const getTasks = () => {
    return tasks;
  };
  const subTasks: SubTask[] = [
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
  // 子タスクを返却
  const getSubTasks = () => {
    return subTasks;
  };

  return {
    getTasks,
    getSubTasks,
  };
};
