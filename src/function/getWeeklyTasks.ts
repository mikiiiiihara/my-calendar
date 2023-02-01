import { SubTask } from "../types/sub-task";
import { Task } from "../types/task";
import { CalendarTask } from "../types/calendar-task";
import { StatusType } from "../types/option";

export const getWeeklyTasks = (
  tasks: Task[],
  subTasks: SubTask[],
  statusType: StatusType[]
): CalendarTask[] => {
  const weeklyTasks: CalendarTask[] = subTasks.map((subTask) => {
    // 紐付く親タスクを取得する
    const myParentTask = tasks.find((task) => task.id === subTask.parentTaskId);
    // 紐付く親タスクがない場合、異常なのでエラー
    if (myParentTask == null)
      throw new Error("親子タスクの紐付けを確認できませんでした。");
    const title = `${myParentTask.title} - ${subTask.title}`;
    // タスクのカラーを取得
    const selectedStatus = statusType.find(
      (statusItem) => statusItem.name === subTask.status
    );
    const backgroundColor = selectedStatus
      ? selectedStatus.color
      : "rgb(225, 225, 225)";
    return {
      id: subTask.id,
      title,
      start: subTask.start.toISOString(),
      end: subTask.end.toISOString(),
      backgroundColor,
    };
  });
  return weeklyTasks;
};
