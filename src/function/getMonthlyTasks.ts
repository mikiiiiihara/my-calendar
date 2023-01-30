import { CalendarTask } from "../types/calendar-task";
import { Task } from "../types/task";
import { checkColorOfStatus } from "./checkColorOfStatus";

export const getMonthlyTasks = (tasks: Task[]): CalendarTask[] => {
  return tasks.map((task) => {
    const { id, title, start, end, status } = task;
    return {
      id,
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      backgroundColor: checkColorOfStatus(status),
    };
  });
};
