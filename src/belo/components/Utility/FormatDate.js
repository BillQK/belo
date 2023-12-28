import isToday from "date-fns/isToday";
import format from "date-fns/format";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isToday(date)) {
    // Format as time if the comment was created today
    return format(date, "h:mm aa");
  } else {
    // Otherwise, format as a date
    return format(date, "MM/dd/yyyy");
  }
};
