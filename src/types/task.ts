import { Status } from "../consts/Status";

export type Task = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: Status;
};
