import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

function createPictureElement(pictureData) {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = pictureData.url;
  pictureElement.querySelector('.picture__img').alt = pictureData.description;
  pictureElement.querySelector('.picture__likes').textContent = pictureData.likes;
  pictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;

  // Добавляем обработчик клика для открытия полноразмерного фото
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(pictureData);
  });

  return pictureElement;
}

function renderPictures(picturesData) {
  const fragment = document.createDocumentFragment();
  picturesData.forEach((pictureData) => {
    fragment.appendChild(createPictureElement(pictureData));
  });
  picturesContainer.append(fragment);
}

export { renderPictures };
