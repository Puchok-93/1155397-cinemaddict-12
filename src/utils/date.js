import moment from "moment";

export const durationFilm = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  const durationHours = `${duration.hours() > 0 ? `${duration.hours()}h` : ``}`;
  const durationMinutes = `${duration.minutes() > 0 ? `${duration.minutes()}m` : ``}`;

  return `${durationHours} ${durationMinutes}`;
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
