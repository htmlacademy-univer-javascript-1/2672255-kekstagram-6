import { getRandomInteger, createRandomIdFromRangeGenerator } from './util.js';

// Исходные данные
export const userNames = [
  'Александр', 'Мария', 'Дмитрий', 'Анна', 'Сергей',
  'Екатерина', 'Андрей', 'Ольга', 'Алексей', 'Наталья',
  'Иван', 'Ирина', 'Максим', 'Светлана', 'Владимир',
  'Татьяна', 'Павел', 'Елена', 'Константин', 'Юлия',
  'Николай', 'Анастасия', 'Артем', 'Людмила', 'Михаил',
  'Виктория', 'Роман', 'Ксения', 'Евгений', 'Марина'
];

export const userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const photoDescriptions = [
  'Закат на море', 'Горный пейзаж', 'Уютный вечер дома', 'Прогулка в лесу',
  'Кофе в любимой кружке', 'Уличное граффити', 'Первые весенние цветы',
  'Городские огни ночью', 'Снегопад за окном', 'Моя кошка в коробке',
  'Завтрак выходного дня', 'Старый дворик', 'Пляж в солнечный день',
  'Книга и плед', 'Архитектура старого города', 'Осенний парк',
  'Готовка на кухне', 'Утренняя пробежка', 'Концерт живой музыки',
  'Рыбалка на рассвете', 'Дождь за окном', 'Велосипедная прогулка',
  'Фестиваль уличной еды', 'Зимние забавы', 'Заброшенное здание'
];

// Генерация комментариев
const generateIdComment = createRandomIdFromRangeGenerator(1, 750);

const createComment = (quantity) => {
  const comments = [];
  for (let i = 0; i < quantity; i++) {
    comments.push({
      id: generateIdComment(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: userComments[getRandomInteger(0, userComments.length - 1)],
      name: userNames[getRandomInteger(0, userNames.length - 1)]
    });
  }
  return comments;
};

// Генерация одного поста
const createSinglePost = (generateId, generateUrl) => ({
  id: generateId(),
  url: `photos/${generateUrl()}.jpg`,
  description: photoDescriptions[getRandomInteger(0, photoDescriptions.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: createComment(getRandomInteger(0, 30))
});

// Генерация массива постов
export const createPosts = (quantity) => {
  const generateId = createRandomIdFromRangeGenerator(1, quantity);
  const generateUrl = createRandomIdFromRangeGenerator(1, quantity);
  const posts = [];
  for (let i = 0; i < quantity; i++) {
    posts.push(createSinglePost(generateId, generateUrl));
  }
  return posts;
};
