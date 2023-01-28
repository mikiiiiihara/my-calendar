import { useCallback, useEffect, useState } from "react";
import { Task } from "../types/task";

export const useTasks = () => {
  /* subtasks */
  const [tasks, setTasks] = useState<Task[]>([]);

  /* actions */
  const fetchTasks = useCallback(async (): Promise<void> => {
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
    setTasks(tasks);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
  };
};
