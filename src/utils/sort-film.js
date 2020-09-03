export const sortByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export const sortByDate = (filmA, filmB) => {
  return filmB.year - filmA.year;
};
