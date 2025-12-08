const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

// скрываем счётчик и кнопку загрузки комментариев
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

commentCountBlock.classList.add('hidden');
commentsLoader.classList.add('hidden');

// функция закрытия окна (объявляем раньше, чтобы линтер не ругался)
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// функция для отрисовки комментариев
const renderComments = (comments) => {
  commentsList.innerHTML = ''; // очищаем список
  const fragment = document.createDocumentFragment();

  comments.forEach(({ avatar, name, message }) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = avatar;
    img.alt = name;
    img.width = 35;
    img.height = 35;

    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = message;

    li.appendChild(img);
    li.appendChild(p);
    fragment.appendChild(li);
  });

  commentsList.appendChild(fragment);
};

// функция открытия окна
const openBigPicture = (pictureData) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = pictureData.url;
  bigPictureImg.alt = pictureData.description;
  likesCount.textContent = pictureData.likes;
  commentsCount.textContent = pictureData.comments.length;
  caption.textContent = pictureData.description;

  renderComments(pictureData.comments);

  // обработчики закрытия
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeBigPicture();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  document.addEventListener('keydown', onEscKeyDown);

  closeButton.addEventListener('click', () => {
    closeBigPicture();
    document.removeEventListener('keydown', onEscKeyDown);
  });
};

export { openBigPicture };
