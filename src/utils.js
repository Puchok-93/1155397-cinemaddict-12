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

export const generateSet = (source, counter) => {
  const randomCount = getRandomInteger(counter.MIN, counter.MAX);
  let typeSet = [];
  for (let i = 0; i < randomCount; i++) {
    let randomIndex = getRandomInteger(0, source.length - 1);
    typeSet.push(source[randomIndex]);
  }
  typeSet = new Set(typeSet);
  return [...typeSet];
};
