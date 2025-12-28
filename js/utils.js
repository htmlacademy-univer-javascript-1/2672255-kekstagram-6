const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createPhotos = (count) =>
Array.from({ length: count }, getImageDescription);

export { createPhotos };
const showLoadError = (message) => {
  const errorBlock = document.createElement('div');
  errorBlock.classList.add('load-error');
  errorBlock.textContent = message;
  errorBlock.style.cssText = `
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff6b6b;
    color: white;
    padding: 12px 20px;
    font-size: 18px;
    z-index: 1000;
  `;
  document.body.append(errorBlock);
};

import { descriptions, commentsList, names } from './data.js';
const createRandomIdMsg = createRandomIdFromRangeGenerator(1, 1000);
const createRandomId = createRandomIdFromRangeGenerator(1, 25);
const createRandomUrl = createRandomIdFromRangeGenerator(1, 25);

const getComments = () => {
  const randomNameIndex = getRandomInteger(0, names.length - 1);
  const randomeMassageIndex = getRandomInteger(0, commentsList.length -1);

  return {
    id: createRandomIdMsg(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: commentsList[randomeMassageIndex],
    name: names[randomNameIndex],
  };
};
const getImageDescription = () => ({
  id: createRandomId(),
  url: `photos/${createRandomUrl()}.jpg`,
  description: descriptions[getRandomInteger(0, descriptions.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, getComments)
});

export { showLoadError };
