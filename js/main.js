import { renderPictures } from './pictures.js';
import { initImageUpload } from './upload-form.js';
import { initScale } from './shapes.js';
import { initEffects } from './effects.js';
import { validate } from './validate.js';
import { showLoadError } from './utils.js';
import { getPhotos } from './api.js';
import { getFilters } from './filters.js'; // Эта функция не используется, но может понадобиться позже

function init() {
  getPhotos()
    .then((photos) => {
    renderPictures(photos);
    getFilters(photos, renderPictures); // Добавлен вызов функции, если она нужна
  })
    .catch((error) => {
    showLoadError(`Ошибка загрузки данных: ${error.message}`);
  });

  initImageUpload();
  initScale();
  initEffects();
  validate();
}

init();
