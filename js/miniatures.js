const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

function createPictureElement(pictureData) {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = pictureData.url;
  pictureElement.querySelector('.picture__img').alt = pictureData.description;
  pictureElement.querySelector('.picture__likes').textContent = pictureData.likes;
  pictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;
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
