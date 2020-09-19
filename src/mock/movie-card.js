import {getRandomInteger, generateSet, getRandomValue} from "../utils/common.js";
import {emojiMap, MAX_DAYS_GUP, MAX_HOURS, MAX_MINUTES} from "../const.js";

/* Генерируем случайный комментарий */

const Comment = {
  GOOD: `Interesting setting and a good cast`,
  BOORING: `Booooooooooring`,
  OLD: `Very very old. Meh`,
  LONG: `Almost two hours? Seriously?`,
};

const СOMMENTS = [
  Comment.GOOD,
  Comment.BOORING,
  Comment.OLD,
  Comment.LONG
];

const generateCommentText = () => {
  const randomIndex = getRandomInteger(0, СOMMENTS.length - 1);
  return СOMMENTS[randomIndex];
};

/* Генерируем случайное имя автора */

const Name = {
  JOHN: `John`,
  TIMMY: `Timmy`,
  ERIC: `Eric`,
  KYLE: `Kyle`,
};

const NAMES = [
  Name.JOHN,
  Name.TIMMY,
  Name.ERIC,
  Name.KYLE,
];

const Surname = {
  PARKER: `Parker`,
  LEE: `Lee`,
  MORGAN: `Morgan`,
  WAYNE: `Wayne`,
};

const SURNAMES = [
  Surname.PARKER,
  Surname.LEE,
  Surname.MORGAN,
  Surname.WAYNE,
];

export const generateRandomName = () => {
  return `${getRandomValue(NAMES)} ${getRandomValue(SURNAMES)}`;
};


/* Генерируем случайную дату комментария */

const generateCommentDate = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GUP, 0);
  const currentDate = new Date();

  currentDate.setHours(getRandomInteger(0, MAX_HOURS), getRandomInteger(0, MAX_MINUTES));
  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};


const createRandomComment = (item, index) => {
  const emoji = Object.keys(emojiMap)[getRandomInteger(0, Object.keys(emojiMap).length - 1)];
  const img = emojiMap[emoji];
  return {
    name: generateRandomName(),
    text: generateCommentText(),
    date: generateCommentDate(),
    emoji,
    img,
    id: index
  };
};

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

/*  ---------------------------------------------------------------- Генерируем случайное описание фильма ---------------------------------------------------------------- */

export const generateDescription = () => {
  const descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const descriptionsArr = descriptions.split(`. `);
  const descriptionsSlice = descriptionsArr.slice(getRandomInteger(0, descriptionsArr.length - 1));

  return descriptionsSlice;
};

/*  ---------------------------------------------------------------- Генерируем случайное дату фильма ---------------------------------------------------------------- */


const filmDate = {
  first: new Date(1895, 0, 1),
  last: new Date()
};

const generateDate = () => {
  const {first, last} = filmDate;
  const minTimestamp = first - new Date(0);
  const maxTimestamp = last - new Date(0);
  const randomTimestamp = getRandomInteger(minTimestamp, maxTimestamp);

  const date = new Date(randomTimestamp);
  return date;
};

const FilmDuration = {
  MIN: 5,
  MAX: 240
};

const FilmRating = {
  MIN: 10,
  MAX: 100
};

const generateRating = () => {
  const {MIN, MAX} = FilmRating;
  return (getRandomInteger(MIN, MAX) / 10).toFixed(1);
};

const MAX_COMMENTS_QUANTITY = 5;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateMovieCard = () =>{
  const id = generateId();
  const title = getRandomValue(TITLES);
  const poster = getRandomValue(POSTERS);
  const rating = generateRating();
  const director = getRandomValue(DIRECTORS);
  const date = generateDate();
  const duration = getRandomInteger(FilmDuration.MIN, FilmDuration.MAX);
  const country = getRandomValue(COUNTRIES);
  const description = generateDescription();
  const age = getRandomValue(AGE_RATING);
  const writers = generateSet(WRITERS, WritersCount);
  const actors = generateSet(ACTORS, ActorsCount);
  const genres = generateSet(GENRES, GenresCount);
  const isWatchList = Boolean(getRandomInteger(0, 1));
  const isWatched = Boolean(getRandomInteger(0, 1));
  const isFavorite = Boolean(getRandomInteger(0, 1));
  const comments = new Array(getRandomInteger(0, MAX_COMMENTS_QUANTITY)).fill().map((item, index) => createRandomComment(item, index));
  const quantityOfComments = comments.length;

  return ({
    userEmoji: ``,
    id,
    title,
    poster,
    description,
    comments,
    quantityOfComments,
    rating,
    date,
    director,
    writers,
    actors,
    age,
    duration,
    genres,
    country,
    isWatchList,
    isWatched,
    isFavorite,
  });
};

export const generateMovieCards = (count) => {
  return new Array(count).fill().map(generateMovieCard);
};
