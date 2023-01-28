import { STATUS } from "../consts/Status";

export const checkColorOfStatus = (status: string) => {
  switch (status) {
    case STATUS.todo:
      return "#ff6347";
    case STATUS.inProgress:
      return "#4169e1";
    case STATUS.inReview:
      return "#ffd700";
    case STATUS.done:
      return "#3cb371";
  }
  return "rgb(225, 225, 225)";
};
