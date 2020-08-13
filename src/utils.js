export const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomValue = (list) => {
  const randomIndex = getRandomInteger(0, list.length - 1);
  return list[randomIndex];
};

export const generateUniqueCompilation = (source, dictionary) => {
  const {min, max} = dictionary;
  const count = getRandomInteger(min, max);
  const uniqueValues = new Set();

  for (let i = 0; i < count; i++) {
    uniqueValues.add(getRandomValue(source));
  }

  return Array.from(uniqueValues);
};
