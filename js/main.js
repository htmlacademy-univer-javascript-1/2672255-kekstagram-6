import { createPosts } from './data.js';
import { renderPictures } from './miniatures.js';
import { initImageScale, scaleReset } from './scale.js';
import { initSlider, resetSlider, resetEffects } from './effects.js';

// Генерируем 25 постов
const postsFromKekstagram = createPosts(25);

// Отрисовываем их на странице
renderPictures(postsFromKekstagram);

// Инициализация масштабирования и эффектов при открытии формы
initImageScale();
initSlider();

// Логика закрытия формы
const uploadCancelButton = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');

uploadCancelButton.addEventListener('click', () => {
  // сброс масштаба и эффектов
  scaleReset();
  resetSlider();
  resetEffects();

  // скрываем оверлей
  uploadOverlay.classList.add('hidden');
});
