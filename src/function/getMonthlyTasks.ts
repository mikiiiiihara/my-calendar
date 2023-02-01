import { CalendarTask } from "../types/calendar-task";
import { StatusType } from "../types/option";
import { Task } from "../types/task";

export const getMonthlyTasks = (
  tasks: Task[],
  statusType: StatusType[]
): CalendarTask[] => {
  return tasks.map((task) => {
    const { id, title, start, end, status } = task;
    // タスクのカラーを取得
    const selectedStatus = statusType.find(
      (statusItem) => statusItem.name === status
    );
    const backgroundColor = selectedStatus
      ? selectedStatus.color
      : "rgb(225, 225, 225)";
    return {
      id,
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      backgroundColor,
    };
  });
};
