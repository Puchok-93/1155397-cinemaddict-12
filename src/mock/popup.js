import {getRandomInteger, generateUniqueCompilation, generateMovieTitle, generateMoviePoster, generateDescription} from "../utils";
/* Генерируем случайную страну производителя*/

const generateCountry = () => {
  const countries = [`USA`, `Germany`, `England`, `Scotland`, `Italy`];
  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

/* Генерируем случайного режисера*/
const generateDirector = () => {
  const directors = [`Anthony Mann`, `Steven Spielberg`, `Martin Scorsese`, `Ridley Scott`, `John Howard Carpenter`];
  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

/* Генерируем случайных писателей*/
const writers = [`Steven King`, `Howard Phillips Lovecraft`, `George R. R. Martin`, `Quentin Tarantino`];
const writersCount = {
  min: 1,
  max: 5
};

/* Генерируем случайных актеров*/
const actors = [`Ewan McGregor`, `Liam Neeson`, `Ian McKellen`, `Bill Skarsgård`, `Andrew Garfield`];
const actorsCount = {
  min: 1,
  max: 5
};

/* Генерируем случайные жанры*/

const genres = [`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`];
const genresCount = {
  min: 1,
  max: 3
};

/* Генерируем случайный возрастной рейтинг фильма*/

const generateAgeRating = () => {
  const age = [`6+`, `12+`, `16+`, `18+`];

  const randomIndex = getRandomInteger(0, age.length - 1);
  return age[randomIndex];
};

/* Генерируем случайный рейтинг фильма*/

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

const generateDuration = () => {
  const {hours, minutes} = filmDurationMax;
  const hoursDuration = getRandomInteger(0, hours);
  const minutesDuration = getRandomInteger(0, minutes);

  return `${hoursDuration > 0 ? `${hoursDuration}h` : ``} ${minutesDuration > 0 ? `${minutesDuration}m` : ``}`;
};

/* Генерируем случайную дату релиза*/

const filmDate = {
  day: {
    first: 1,
    last: 31,
  },
  month: {
    first: 0,
    last: 11
  },
  year: {
    first: 1929,
    last: new Date().getFullYear()
  }
};

const generateDate = () => {
  const {day, month, year} = filmDate;

  const randomYear = getRandomInteger(year.first, year.last);
  const randomMonth = getRandomInteger(month.first, month.last);
  const randomDate = getRandomInteger(day.first, day.last);
  const date = new Date(randomYear, randomMonth, randomDate);

  return date;
};

export const generatePopup = () => {

  return {
    title: generateMovieTitle(),
    poster: generateMoviePoster(),
    country: generateCountry(),
    director: generateDirector(),
    age: generateAgeRating(),
    writers: generateUniqueCompilation(writers, writersCount),
    actors: generateUniqueCompilation(actors, actorsCount),
    genres: generateUniqueCompilation(genres, genresCount),
    description: generateDescription(),
    raiting: generateRating(),
    duration: generateDuration(),
    date: generateDate()
  };
};
