import { Task } from "gantt-task-react";
import { SubTask } from "../types/sub-task";
import { Task as ParentTask } from "../types/task";
import { checkColorOfStatus } from "./checkColorOfStatus";

export const getDailyTasks = (
  tasks: ParentTask[],
  subTasks: SubTask[]
): Task[] => {
  const sortedTasks = tasks.sort(function (a, b) {
    if (a.start < b.start) return -1;
    if (a.start > b.start) return 1;
    return 0;
  });
  const dailyTasks: Task[] = [];
  for (const task of sortedTasks) {
    const taskList: Task[] = [];
    // ステータスの色を取得
    const statusColor = checkColorOfStatus(task.status);
    const dailyTask: Task = {
      id: task.id,
      name: task.title,
      start: task.start,
      end: task.end,
      progress: 100,
      type: "project",
      hideChildren: false,
      displayOrder: 1,
      styles: {
        backgroundColor: statusColor,
        progressColor: statusColor,
      },
    };
    taskList.push(dailyTask);
    // 親タスクに紐付く子タスクを抽出
    const relatedSubTask = subTasks.filter(
      (subTask) => subTask.parentTaskId === task.id
    );
    // 紐付く子タスクを代入
    for (const subTask of relatedSubTask) {
      const dailyTask: Task = {
        id: subTask.id,
        name: `  ${subTask.title}`,
        start: subTask.start,
        end: subTask.end,
        progress: 100,
        type: "task",
        project: task.id,
        displayOrder: 1,
        styles: {
          backgroundColor: checkColorOfStatus(subTask.status),
          progressColor: checkColorOfStatus(subTask.status),
        },
      };
      taskList.push(dailyTask);
    }
    // 開始日が早い順にソートして、挿入する
    const sortedTaskList = taskList.sort(function (a, b) {
      if (a.start < b.start) return -1;
      if (a.start > b.start) return 1;
      return 0;
    });
    sortedTaskList.map((tasks) => dailyTasks.push(tasks));
  }
  return dailyTasks;
};
