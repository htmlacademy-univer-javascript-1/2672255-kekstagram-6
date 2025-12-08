const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleSize = document.querySelector('.img-upload__scale');
const scaleSizeControl = scaleSize.querySelector('.scale__control--value');
const smallerButton = scaleSize.querySelector('.scale__control--smaller');
const biggerButton = scaleSize.querySelector('.scale__control--bigger');

let currentScale = SCALE_DEFAULT;

const setNewScale = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleSizeControl.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  currentScale = parseInt(scaleSizeControl.value, 10);
  let newScale = currentScale - SCALE_STEP;
  if (newScale < SCALE_MIN) {
    newScale = SCALE_MIN;
  }
  setNewScale(newScale);
};

const onBiggerButtonClick = () => {
  currentScale = parseInt(scaleSizeControl.value, 10);
  let newScale = currentScale + SCALE_STEP;
  if (newScale > SCALE_MAX) {
    newScale = SCALE_MAX;
  }
  setNewScale(newScale);
};

const initImageScale = () => {
  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
  setNewScale(SCALE_DEFAULT); // при инициализации выставляем 100%
};

const scaleReset = () => {
  setNewScale(SCALE_DEFAULT);
  smallerButton.removeEventListener('click', onSmallerButtonClick);
  biggerButton.removeEventListener('click', onBiggerButtonClick);
};

export { initImageScale, scaleReset };
