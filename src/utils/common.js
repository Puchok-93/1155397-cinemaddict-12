const QUANTITY_OF_ELEMENTS_IN_SORTED_ARRAYS = 2;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const sortObjectsArrayByProperty = (array, property) => {
  return array.sort((a, b) => b[property] - a[property]).slice(0, QUANTITY_OF_ELEMENTS_IN_SORTED_ARRAYS);
};

export const getRandomValue = (items) => {
  const randomIndex = getRandomInteger(0, items.length - 1);
  return items[randomIndex];
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
