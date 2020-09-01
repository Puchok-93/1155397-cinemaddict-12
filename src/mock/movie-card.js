import {getRandomInteger, generateSet} from "../utils/common.js";
import {generateComments} from "./comment.js";

const Title = {
  DANCE: `The Dance of Life`,
  SAGEBRUSH: `Sagebrush Trail`,
  GOLDEN: `The Man with the Golden Arm`,
  SANTA: `Santa Claus Conquers the Martians`,
  POPEYE: `Popeye the Sailor Meets Sindbad the Sailor`,
};

const TITLES = [
  Title.DANCE,
  Title.SAGEBRUSH,
  Title.GOLDEN,
  Title.SANTA,
  Title.POPEYE,
];

const generateMovieTitle = () => {
  const randomIndex = getRandomInteger(0, TITLES.length - 1);
  return TITLES[randomIndex];
};

/* Генерируем случайный постер фильма*/

const Poster = {
  EACH_OTHER: `made-for-each-other.png`,
  POPEYE: `popeye-meets-sinbad.png`,
  SAGEBRUSH: `sagebrush-trail.jpg`,
  SANTA: `santa-claus-conquers-the-martians.jpg`,
  DANCE: `the-dance-of-life.jpg`,
  FLAMARION: `the-great-flamarion.jpg`,
  GOLDEN: `the-man-with-the-golden-arm.jpg`
};

const POSTERS = [
  Poster.DANCE,
  Poster.SAGEBRUSH,
  Poster.GOLDEN,
  Poster.SANTA,
  Poster.POPEYE,
];

const generateMoviePoster = () => {
  const randomIndex = getRandomInteger(0, POSTERS.length - 1);
  return POSTERS[randomIndex];
};

/* Генерируем случайный рейтинг для карточки анонса */

const FilmRating = {
  MIN: 1,
  MAX: 100,
};

/* Генерируем случайный год выпуска для карточки анонса */
const generateMovieYear = () => {
  const randomIndex = getRandomInteger(1875, 1945);
  return randomIndex;
};

/* Генерируем случайное количество комментариев для карточки анонса */
const generateComment = () => {
  const randomIndex = getRandomInteger(0, 5);
  return randomIndex;
};

/* Генерируем случайную  продолжительность */
const FilmDurationMax = {
  HOURS: 4,
  MINUTES: 60,
};

const generateDuration = () => {
  const {HOURS, MINUTES} = FilmDurationMax;
  const hoursDuration = getRandomInteger(0, HOURS);
  const minutesDuration = getRandomInteger(0, MINUTES);

  return `${hoursDuration > 0 ? `${hoursDuration}h` : ``} ${minutesDuration > 0 ? `${minutesDuration}m` : ``}`;
};


/* Генерируем случайное описание фильма*/

export const generateDescription = () => {
  const descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const descriptionsArr = descriptions.split(`. `);
  const descriptionsSlice = descriptionsArr.slice(getRandomInteger(0, descriptionsArr.length - 1));

  return descriptionsSlice;
};
/* Генерируем случайную дату релиза фильма*/

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
    first: 1875,
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

/* Генерируем случайных режисеров фильма */

const Director = {
  MANN: `Anthony Mann`,
  SPILBERG: `Steven Spielberg`,
  SCORSESE: `Martin Scorsese`,
  SCOTT: `Ridley Scott`,
  CARPENTER: `John Howard Carpenter`,
};

const DIRECTORS = [
  Director.MANN,
  Director.SPILBERG,
  Director.SCORSESE,
  Director.SCOTT,
  Director.CARPENTER,
];

const generateDirector = () => {
  const randomIndex = getRandomInteger(0, DIRECTORS.length - 1);
  return DIRECTORS[randomIndex];
};

/* Генерируем случайную страну */

const Country = {
  USA: `USA`,
  GERMANY: `Germany`,
  ENGLAND: `England`,
  SCOTLAND: `Scotland`,
  ITALY: `Italy`,
};

const COUNTRIES = [
  Country.USA,
  Country.GERMANY,
  Country.ENGLAND,
  Country.SCOTLAND,
  Country.ITALY,
];

const generateCountry = () => {
  const randomIndex = getRandomInteger(0, COUNTRIES.length - 1);
  return COUNTRIES[randomIndex];
};

/* Генерируем возрастной рейтинг страну */

const AgeRaiting = {
  G: `0+`,
  PG: `6+`,
  PG13: `12+`,
  R: `16+`,
  NC17: `18+`,
};

const AGE_RAITING = [
  AgeRaiting.G,
  AgeRaiting.PG,
  AgeRaiting.PG13,
  AgeRaiting.R,
  AgeRaiting.NC17,
];

const generateAgeRaiting = () => {
  const randomIndex = getRandomInteger(0, AGE_RAITING.length - 1);
  return AGE_RAITING[randomIndex];
};

/* Генерируем жанры */

const Genre = {
  MUSICAL: `Musical`,
  WESTERN: `Western`,
  DRAMA: `Drama`,
  COMEDY: `Comedy`,
  CARTOON: `Cartoon`,
};

const GENRES = [
  Genre.MUSICAL,
  Genre.WESTERN,
  Genre.DRAMA,
  Genre.COMEDY,
  Genre.CARTOON,
];

const GenresCount = {
  MIN: 1,
  MAX: 3
};

/* Генерируем писателей */

const Writers = {
  KING: `Steven King`,
  LOVECRAFT: `Howard Phillips Lovecraft`,
  MARTIN: `George R. R. Martin`,
  TARANTINO: `Quentin Tarantino`,
};

const WRITERS = [
  Writers.KING,
  Writers.LOVECRAFT,
  Writers.MARTIN,
  Writers.TARANTINO,
];

const WritersCount = {
  MIN: 1,
  MAX: 4
};

/* Генерируем актеров */

const Actors = {
  MCGREGOR: `Ewan McGregor`,
  NEESON: `Liam Neeson`,
  MCKELLEN: `Ian McKellen`,
  SKARSGARD: `Bill Skarsgard`,
  GARFIELD: `Andrew Garfield`,
};

const ACTORS = [
  Actors.MCGREGOR,
  Actors.NEESON,
  Actors.MCKELLEN,
  Actors.SKARSGARD,
  Actors.GARFIELD,
];

const ActorsCount = {
  MIN: 1,
  MAX: 5
};

const generateMovieCard = () => {
  const commentsCount = getRandomInteger(0, 5);
  return {
    title: generateMovieTitle(),
    poster: generateMoviePoster(),
    rating: getRandomInteger(FilmRating.MIN, FilmRating.MAX),
    year: generateMovieYear(),
    comment: generateComment(),
    date: generateDate(),
    duration: generateDuration(),
    description: generateDescription(),
    isWatch: Boolean(getRandomInteger(0, 1)),
    isHistory: Boolean(getRandomInteger(0, 1)),
    isFavorites: Boolean(getRandomInteger(0, 1)),
    director: generateDirector(),
    country: generateCountry(),
    age: generateAgeRaiting(),
    genre: generateSet(GENRES, GenresCount),
    writers: generateSet(WRITERS, WritersCount),
    actors: generateSet(ACTORS, ActorsCount),
    comments: generateComments(commentsCount)
  };
};

export const generateMovieCards = (count) => {
  return new Array(count).fill().map(generateMovieCard);
};

export const getTopRatedFilms = (cards, count) => {
  return cards.sort((a, b) => {
    return b.raiting - a.raiting;
  }).slice(0, count);
};

export const getMostCommentedFilms = (cards, count) => {
  return cards.sort((a, b) => {
    return b.comments.length - a.comments.length;
  }).slice(0, count);
};
