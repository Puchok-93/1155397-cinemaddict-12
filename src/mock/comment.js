import {getRandomInteger} from "../utils.js";
/* Генерация случайного автора */

const generateCommentAuthor = () => {
  const authors = [`Tim Macoveev`, `Homer Simpson`, `Sharalin Tomphson`, `Camila Wood`];
  const randomIndex = getRandomInteger(0, authors.length - 1);
  return authors[randomIndex];
};

/* Генерация случайной эмоции */

const generateCommentEmoji = () => {
  const emojis = [`smile.png`, `sleeping.png`, `puke.png`, `angry.png`];
  const randomIndex = getRandomInteger(0, emojis.length - 1);
  return emojis[randomIndex];
};

/* Генерация случайного комментария */

const generateCommenеtText = () => {
  const comments = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`];
  const randomIndex = getRandomInteger(0, comments.length - 1);
  return comments[randomIndex];
};

export const generateComment = () => {

  return {
    author: generateCommentAuthor(),
    emoji: generateCommentEmoji(),
    text: generateCommenеtText()
  };
};
