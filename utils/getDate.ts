import moment from "moment";
import "moment/locale/ko";

const getTimeAgo = (time: string) => {
  return moment(time).fromNow();
};

const getDate = (time: string) => {
  return moment(time).format("YYYY.MM.DD");
};

export { getTimeAgo, getDate };
