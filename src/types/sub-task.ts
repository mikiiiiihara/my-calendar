export type SubTask = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  parentTask: string;
  status: string;
  memo: string;
};
