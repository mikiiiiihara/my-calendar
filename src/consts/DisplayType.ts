export const DISPLAY_TYPE = {
  weekly: "weekly",
  daily: "daily",
} as const;

export type DisplayType = typeof DISPLAY_TYPE[keyof typeof DISPLAY_TYPE];
