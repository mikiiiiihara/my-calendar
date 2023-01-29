export type CreateTaskDto = {
  title: string;
  start: Date;
  end: Date;
  status: string;
  memo: string;
  userId: string;
};
