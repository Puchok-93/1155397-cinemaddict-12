import {getRandomInteger, generateID, generateSet} from "../utils/common.js";
import {generateComments} from "./comment.js";

/* ---------------------------------------------------------------- Генерируем заголовок ---------------------------------------------------------------- */

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

/* ---------------------------------------------------------------- Генерируем постер ---------------------------------------------------------------- */

const Poster = {
  EACH_OTHER: `./images/posters/made-for-each-other.png`,
  POPEYE: `./images/posters/popeye-meets-sinbad.png`,
  SAGEBRUSH: `./images/posters/sagebrush-trail.jpg`,
  SANTA: `./images/posters/santa-claus-conquers-the-martians.jpg`,
  DANCE: `./images/posters/the-dance-of-life.jpg`,
  FLAMARION: `./images/posters/the-great-flamarion.jpg`,
  GOLDEN: `./images/posters/the-man-with-the-golden-arm.jpg`
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

/* ---------------------------------------------------------------- Генерируем случайных режисеров фильма ---------------------------------------------------------------- */

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

/* ---------------------------------------------------------------- Генерируем писателей ---------------------------------------------------------------- */

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

/* ---------------------------------------------------------------- Генерируем актеров ---------------------------------------------------------------- */

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

/* ---------------------------------------------------------------- Генерируем случайную страну ---------------------------------------------------------------- */

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

/* ---------------------------------------------------------------- Генерируем жанры ---------------------------------------------------------------- */

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

/* ---------------------------------------------------------------- Генерируем случайный рейтинг ---------------------------------------------------------------- */

const AgeRating = {
  G: `0+`,
  PG: `6+`,
  PG13: `12+`,
  R: `16+`,
  NC17: `18+`,
};

const AGE_RATING = [
  AgeRating.G,
  AgeRating.PG,
  AgeRating.PG13,
  AgeRating.R,
  AgeRating.NC17,
];

const generateAgeRating = () => {
  const randomIndex = getRandomInteger(0, AGE_RATING.length - 1);
  return AGE_RATING[randomIndex];
};


/*  ---------------------------------------------------------------- Генерируем случайное описание фильма ---------------------------------------------------------------- */

export const generateDescription = () => {
  const descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const descriptionsArr = descriptions.split(`. `);
  const descriptionsSlice = descriptionsArr.slice(getRandomInteger(0, descriptionsArr.length - 1));

  return descriptionsSlice;
};

const filmDate = {
  first: new Date(1895, 0, 1),
  last: new Date()
};

/* ---------------------------------------------------------------- Генерируем случайный продолжительность ---------------------------------------------------------------- */

const FilmDuration = {
  MIN: 5,
  MAX: 240
};

/* ---------------------------------------------------------------- Генерируем случайный рейтинг фильма ---------------------------------------------------------------- */

const FilmRating = {
  MIN: 10,
  MAX: 100
};

const generateRating = () => {
  const {MIN, MAX} = FilmRating;
  return (getRandomInteger(MIN, MAX) / 10).toFixed(1);
};

const generateDate = () => {
  const {first, last} = filmDate;
  const minTimestamp = first - new Date(0);
  const maxTimestamp = last - new Date(0);
  const randomTimestamp = getRandomInteger(minTimestamp, maxTimestamp);

  const date = new Date(randomTimestamp);
  return date;
};

const generateMovieCard = () => {
  const commentsCount = getRandomInteger(0, 5);
  return {
    id: generateID(),
    title: generateMovieTitle(),
    poster: generateMoviePoster(),
    originalTitle: generateMovieTitle(),
    rating: generateRating(),
    director: generateDirector(),
    date: generateDate(),
    duration: getRandomInteger(FilmDuration.MIN, FilmDuration.MAX),
    country: generateCountry(),
    description: generateDescription(),
    age: generateAgeRating(),
    isWatchList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorites: Boolean(getRandomInteger(0, 1)),
    genres: generateSet(GENRES, GenresCount),
    writers: generateSet(WRITERS, WritersCount),
    actors: generateSet(ACTORS, ActorsCount),
    comments: generateComments(commentsCount),
  };
};

export const generateMovieCards = (count) => {
  return new Array(count).fill().map(generateMovieCard);
};
