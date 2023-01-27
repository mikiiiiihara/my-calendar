export const STATUS = {
  todo: "Todo",
  inProgress: "In Progress",
  inReview: "In Review",
  done: "Done",
} as const;

export type Status = typeof STATUS[keyof typeof STATUS];
