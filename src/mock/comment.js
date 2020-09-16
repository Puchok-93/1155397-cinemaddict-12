import {getRandomInteger, getRandomValue, generateID} from "../utils/common.js";
import {EMOJIS, MAX_DAYS_GUP, MAX_HOURS, MAX_MINUTES} from "../const.js";


/* Генерируем случайный текст комментария */

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

const generateDate = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GUP, 0);
  const currentDate = new Date();

  currentDate.setHours(getRandomInteger(0, MAX_HOURS), getRandomInteger(0, MAX_MINUTES));
  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};

const generateComment = () => {
  return {
    id: generateID(),
    emoji: getRandomValue(EMOJIS),
    text: generateCommentText(),
    author: generateRandomName(),
    day: generateDate()
  };
};

export const generateComments = (count) => {
  return new Array(count).fill().map(generateComment);
};
