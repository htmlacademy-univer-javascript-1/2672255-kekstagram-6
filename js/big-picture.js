const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

commentCountBlock.classList.remove('hidden');
commentsLoader.classList.remove('hidden');

let allComments = [];
let shownComments = 0;
const COMMENTS_PER_PAGE = 5;

// функция отрисовки части комментариев
const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = allComments.slice(shownComments, shownComments + COMMENTS_PER_PAGE);

  nextComments.forEach(({ avatar, name, message }) => {
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
  shownComments += nextComments.length;

  // обновляем счётчик
  commentCountBlock.textContent = `${shownComments} из ${allComments.length} комментариев`;

  // скрываем кнопку, если комментарии закончились
  if (shownComments >= allComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

// функция закрытия окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsList.innerHTML = '';
  shownComments = 0;
  allComments = [];
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

  // сохраняем все комментарии и показываем первые 5
  allComments = pictureData.comments;
  shownComments = 0;
  commentsList.innerHTML = '';
  renderComments();

  // обработчик кнопки "Загрузить ещё"
  commentsLoader.onclick = () => renderComments();

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
