import { scaleReset } from './shapes.js';

const DEFAULT_EFFECT = {
  name: 'none',
  filter: 'none',
  min: 0,
  max: 100,
  step: 1,
  unit: '',
};

const effectsData = {
  none: {
    filter: DEFAULT_EFFECT.filter,
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
    step: DEFAULT_EFFECT.step,
    unit: DEFAULT_EFFECT.unit,
  },

  chrome: {
    class: 'effects__preview--chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  sepia: {
    class: 'effects__preview--sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  marvin: {
    class: 'effects__preview--marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  phobos: {
    class: 'effects__preview--phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  heat: {
    class: 'effects__preview--heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const imagePreview = document.querySelector('.img-upload__preview img');
const effectsLevelContainer = document.querySelector('.img-upload__effect-level');
const effectsLevelSlider = document.querySelector('.effect-level__slider');
const effectsLevelValue = document.querySelector('.effect-level__value');
const effectsContainer = document.querySelector('.effects');

let currentEffect = DEFAULT_EFFECT;

const createSlider = () => noUiSlider.create(effectsLevelSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

effectsLevelContainer.classList.add('hidden');

const isDefault = () => currentEffect.filter === DEFAULT_EFFECT.filter;

const changeSliderAbility = () => {
  if (isDefault()) {
    effectsLevelContainer.classList.add('hidden');
  } else {
    effectsLevelContainer.classList.remove('hidden');
  }
};

const changeSlider = () => {
  effectsLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.min, // сброс к начальному значению
    connect: 'lower',
  });
  changeSliderAbility();
};

function changeCurrentEffect(effect) {
  currentEffect = effectsData[effect];
  changeSlider();
  effectsLevelValue.value = currentEffect.min; // сброс значения поля формы
}

const onEffectsContainerChange = (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }
  const effectName = evt.target.value;
  changeCurrentEffect(effectName);
};

const onSliderUpdate = () => {
  const currentEffectValue = effectsLevelSlider.noUiSlider.get();
  if (isDefault()) {
    imagePreview.style.filter = 'none';
    scaleReset();
  } else {
    imagePreview.style.filter = `${currentEffect.filter}(${currentEffectValue}${currentEffect.unit})`;
  }
  effectsLevelValue.value = currentEffectValue;
};

const initSlider = () => {
  createSlider();
  onSliderUpdate();
  effectsContainer.addEventListener('change', onEffectsContainerChange);
  effectsLevelSlider.noUiSlider.on('update', onSliderUpdate);
};

const resetSlider = () => {
  effectsContainer.removeEventListener('change', onEffectsContainerChange);
  effectsLevelSlider.noUiSlider.destroy();
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  changeSlider();
};

export { resetEffects, initSlider, resetSlider };
