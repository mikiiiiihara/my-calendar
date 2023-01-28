export const convertDateToJST = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const newDate = new Date(year, month, day, hour, minute);
  newDate.setHours(newDate.getHours() + 9);
  const result = newDate.toJSON().replace(".000Z", "");
  return result;
};
