import { Status } from "../consts/Status";

export type SubTask = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  parentTask: string;
  status: Status;
};
