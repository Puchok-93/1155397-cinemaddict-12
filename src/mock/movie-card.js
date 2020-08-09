import {getRandomInteger, generateMovieTitle, generateMoviePoster, generateDescription} from "../utils";

/* Генерируем случайный год выпуска для карточки анонса */
const generateMovieYear = () => {
  const years = [`1929`, `1933`, `1955`, `1964`, `1936`];
  const randomIndex = getRandomInteger(0, years.length - 1);
  return years[randomIndex];
};

/* Генерируем случайный жанр для карточки анонса */
const generateMovieGenre = () => {
  const genres = [`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`];

  const randomIndex = getRandomInteger(0, genres.length - 1);
  return genres[randomIndex];
};

/* Генерируем случайное количество комментариев для карточки анонса */
const generateComment = () => {
  const comments = [`0`, `1`, `2`, `3`, `4`, `5`];

  const randomIndex = getRandomInteger(0, comments.length - 1);
  return comments[randomIndex];
};

/* Генерируем случайный рейтинг для карточки анонса */
const filmRating = {
  min: 10,
  max: 100
};

const generateRating = () => {
  const {min, max} = filmRating;
  return (getRandomInteger(min, max) / 10).toFixed(1);
};

/* Генерируем случайную продолжительность фильма*/

const filmDurationMax = {
  hours: 4,
  minutes: 60
};

const generateMovieDuration = () => {
  const {hours, minutes} = filmDurationMax;
  const hoursDuration = getRandomInteger(0, hours);
  const minutesDuration = getRandomInteger(0, minutes);

  return `${hoursDuration > 0 ? `${hoursDuration}h` : ``} ${minutesDuration > 0 ? `${minutesDuration}m` : ``}`;
};

export const generateMovieCard = () => {

  return {
    title: generateMovieTitle(),
    year: generateMovieYear(),
    poster: generateMoviePoster(),
    duration: generateMovieDuration(),
    genre: generateMovieGenre(),
    isWatch: Boolean(getRandomInteger(0, 1)),
    isHistory: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    comments: generateComment(),
    description: generateDescription(),
    raiting: generateRating()
  };
};
