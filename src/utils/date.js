import moment from "moment";
import 'moment-duration-format';

export const durationFilm = (minutes) => {

  return moment.duration(minutes, `minutes`).format(`h[h] m[m]`);
};

export const dateFilm = (anonsDate, fullDate) => {
  if (fullDate) {
    return moment(anonsDate).format(`DD MMMM YYYY`);
  } else {
    return moment(anonsDate).format(`YYYY`);
  }
};

export const humanizeCommentDate = (date) => {

  return moment(date).fromNow();
};
