import { isEscapeKey } from './utils.js';

const COMMENT_MAXLENGTH = 140;
const HASHTAGS_MAXCOUNT = 5;
const VALID_HASHTAG_STRING = /^#[a-zа-яё0-9]{1,19}$/i;

const errorMessages = {
  INVALID_HASHTAG_STRING: 'Хэш-тег должен начинаться с #, состоять из букв и чисел без пробелов, максимальная длина одного хэш-тега 20 символов, включая #',
  COMMENT_MAXLENGTH_ERROR: `Длина комментария не может составлять больше ${COMMENT_MAXLENGTH} символов`,
  COUNT_HASHTAGS_ERROR: `Нельзя указать больше ${HASHTAGS_MAXCOUNT} хэш-тегов`,
  UNIQUENESS_ERROR: 'Хэш-теги не должны повторяться'
};

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const uploadHashtagElement = uploadFormElement.querySelector('.text__hashtags');
const uploadCommentElement = uploadFormElement.querySelector('.text__description');
const submitButton = uploadFormElement.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

// Валидация комментария
const checkComment = (value) => value.length <= COMMENT_MAXLENGTH;
pristine.addValidator(uploadCommentElement, checkComment, errorMessages.COMMENT_MAXLENGTH_ERROR);

// Валидация хэштегов
const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

const checkSymbols = (value) => getHashtags(value).every((hashtag) => VALID_HASHTAG_STRING.test(hashtag));
const checkCount = (value) => getHashtags(value).length <= HASHTAGS_MAXCOUNT;
const checkUniqueness = (value) => {
  const hashtags = getHashtags(value).map((tag) => tag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

pristine.addValidator(uploadHashtagElement, checkSymbols, errorMessages.INVALID_HASHTAG_STRING);
pristine.addValidator(uploadHashtagElement, checkCount, errorMessages.COUNT_HASHTAGS_ERROR);
pristine.addValidator(uploadHashtagElement, checkUniqueness, errorMessages.UNIQUENESS_ERROR);

// Проверка фокуса
const isInputOnFocus = () =>
document.activeElement === uploadHashtagElement || document.activeElement === uploadCommentElement;

// Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputOnFocus()) {
    evt.preventDefault();
    closeForm();
  }
};

// Закрытие формы
const closeForm = () => {
  uploadFormElement.reset();
  pristine.reset();
  uploadInputElement.value = ''; // сброс input[type=file]
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Открытие формы
const openForm = () => {
  uploadInputElement.addEventListener('change', () => {
    uploadOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    bodyElement.classList.add('modal-open');
    uploadCancelButtonElement.addEventListener('click', closeForm);
  });
};

// Сообщения успеха/ошибки
const showSuccessMessage = () => {
  const template = document.querySelector('#success').content.querySelector('.success');
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const button = message.querySelector('.success__button');
  const close = () => message.remove();

  button.addEventListener('click', close);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      close();
    }
  });
  message.addEventListener('click', (evt) => {
    if (evt.target === message) {
      close();
    }
  });
};

const showErrorMessage = () => {
  const template = document.querySelector('#error').content.querySelector('.error');
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const button = message.querySelector('.error__button');
  const close = () => message.remove();

  button.addEventListener('click', close);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      close();
    }
  });
  message.addEventListener('click', (evt) => {
    if (evt.target === message) {
      close();
    }
  });
};

// Отправка формы
uploadFormElement.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  submitButton.disabled = true;

  try {
    const formData = new FormData(uploadFormElement);
    const response = await fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      closeForm();
      showSuccessMessage();
    } else {
      showErrorMessage();
    }
  } catch (err) {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
  }
});

export { openForm };
