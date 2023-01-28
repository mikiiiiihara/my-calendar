export type SubTask = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  parentTaskId: string;
  parentTaskName: string;
  status: string;
  memo: string;
};
