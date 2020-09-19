import moment from "moment";
import "moment-duration-format";

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

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};


export const formatDateComment = (date) => {

  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).calendar(null, {
    sameDay: `[Today]`,
    lastDay: `[Yesterday]`,
    sameElse: `L HH:mm:ss`
  });
};

export const sortByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(new Date(filmA.releaseDateForSort), new Date(filmB.releaseDateForSort));

  if (weight !== null) {
    return weight;
  }

  return filmB.date.getTime() - filmA.date.getTime();
};

export const sortByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export const sortByComments = (filmA, filmB) =>{
  return filmB.comments.length - filmA.comments.length;
};
