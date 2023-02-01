import { Task } from "gantt-task-react";
import { StatusType } from "../types/option";
import { SubTask } from "../types/sub-task";
import { Task as ParentTask } from "../types/task";

export const getDailyTasks = (
  tasks: ParentTask[],
  subTasks: SubTask[],
  statusType: StatusType[]
): Task[] => {
  const sortedTasks = tasks.sort(function (a, b) {
    if (a.start < b.start) return -1;
    if (a.start > b.start) return 1;
    return 0;
  });
  // 現在日時を取得
  const currentDate = new Date();
  const dailyTasks: Task[] = [];
  for (const task of sortedTasks) {
    const taskList: Task[] = [];
    // 現在日時以前に終了しているタスクは取得しない
    if (currentDate.getTime() < task.end.getTime()) {
      // タスクのカラーを取得
      const selectedStatus = statusType.find(
        (statusItem) => statusItem.name === task.status
      );
      const backgroundColor = selectedStatus
        ? selectedStatus.color
        : "rgb(225, 225, 225)";
      // ステータスの色を取得
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
          backgroundColor: backgroundColor,
          progressColor: backgroundColor,
        },
      };
      taskList.push(dailyTask);
      // 親タスクに紐付く子タスクを抽出
      const relatedSubTask = subTasks.filter(
        (subTask) => subTask.parentTaskId === task.id
      );
      // 紐付く子タスクを代入
      for (const subTask of relatedSubTask) {
        // タスクのカラーを取得
        const selectedStatus = statusType.find(
          (statusItem) => statusItem.name === subTask.status
        );
        const backgroundColor = selectedStatus
          ? selectedStatus.color
          : "rgb(225, 225, 225)";
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
            backgroundColor,
            progressColor: backgroundColor,
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
  }
  return dailyTasks;
};
