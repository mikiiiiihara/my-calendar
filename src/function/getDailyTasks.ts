import { Task } from "gantt-task-react";
import { SubTask } from "../types/sub-task";
import { Task as ParentTask } from "../types/task";
import { checkColorOfStatus } from "./checkColorOfStatus";

export const getDailyTasks = (
  tasks: ParentTask[],
  subTasks: SubTask[]
): Task[] => {
  const dailyTasks: Task[] = [];
  let count = 1;
  for (const task of tasks) {
    // ステータスの色を取得
    const statusColor = checkColorOfStatus(task.status);
    const dailyTask: Task = {
      id: task.title,
      name: task.title,
      start: task.start,
      end: task.end,
      progress: 100,
      type: "project",
      hideChildren: false,
      displayOrder: count,
      styles: {
        backgroundColor: statusColor,
        progressColor: statusColor,
      },
    };
    dailyTasks.push(dailyTask);
    count++;
    // 親タスクに紐付く子タスクを抽出
    const relatedSubTask = subTasks.filter(
      (subTask) => subTask.parentTask === task.title
    );
    // 紐付く子タスクを代入
    for (const subTask of relatedSubTask) {
      const dailyTask: Task = {
        id: subTask.title,
        name: `  ${subTask.title}`,
        start: subTask.start,
        end: subTask.end,
        progress: 100,
        type: "task",
        project: task.title,
        displayOrder: count,
        styles: {
          backgroundColor: checkColorOfStatus(subTask.status),
          progressColor: checkColorOfStatus(subTask.status),
        },
      };
      dailyTasks.push(dailyTask);
      count++;
    }
  }
  return dailyTasks;
};
