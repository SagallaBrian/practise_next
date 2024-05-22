import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

export const myfomatdate = (dateString: string) => {
  console.log(dateString);
  return dayjs.tz(dateString, "HHmmss", "Asia/Seoul").format("HH:mm:ss");
};
