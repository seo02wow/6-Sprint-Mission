import moment from "moment";
import "moment/locale/ko";

const getTimeAgo = (time: string) => {
  return moment(time).fromNow();
};

export default getTimeAgo;
