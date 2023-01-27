import { SubTask } from "../types/sub-task";
import { Task } from "../types/task";
import { WeeklyTask } from "../types/weekly-task";
import { checkColorOfStatus } from "./checkColorOfStatus";

export const getWeeklyTasks = (
  tasks: Task[],
  subTasks: SubTask[]
): WeeklyTask[] => {
  const weeklyTasks: WeeklyTask[] = subTasks.map((subTask) => {
    // 紐付く親タスクを取得する
    const myParentTask = tasks.find(
      (task) => task.title === subTask.parentTask
    );
    // 紐付く親タスクがない場合、異常なのでエラー
    if (myParentTask == null)
      throw new Error("親子タスクの紐付けを確認できませんでした。");
    const title = `${myParentTask.title} - ${subTask.title}`;
    return {
      id: subTask.id,
      title,
      start: subTask.start.toISOString(),
      end: subTask.end.toISOString(),
      backgroundColor: checkColorOfStatus(subTask.status),
    };
  });
  return weeklyTasks;
};
