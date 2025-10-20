const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator  = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const userNames = [ //список имен для пользователя
    "Александр", "Мария", "Дмитрий", "Анна", "Сергей",
    "Екатерина", "Андрей", "Ольга", "Алексей", "Наталья",
    "Иван", "Ирина", "Максим", "Светлана", "Владимир",
    "Татьяна", "Павел", "Елена", "Константин", "Юлия",
    "Николай", "Анастасия", "Артем", "Людмила", "Михаил",
    "Виктория", "Роман", "Ксения", "Евгений", "Марина"
];

const userComments = [ //список комментариев от пользователей
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

const photoDescriptions = [ //список описаний к фото
    "Закат на море",
    "Горный пейзаж",
    "Уютный вечер дома",
    "Прогулка в лесу",
    "Кофе в любимой кружке",
    "Уличное граффити",
    "Первые весенние цветы",
    "Городские огни ночью",
    "Снегопад за окном",
    "Моя кошка в коробке",
    "Завтрак выходного дня",
    "Старый дворик",
    "Пляж в солнечный день",
    "Книга и плед",
    "Архитектура старого города",
    "Осенний парк",
    "Готовка на кухне",
    "Утренняя пробежка",
    "Концерт живой музыки",
    "Рыбалка на рассвете",
    "Дождь за окном",
    "Велосипедная прогулка",
    "Фестиваль уличной еды",
    "Зимние забавы",
    "Заброшенное здание"
];

const generateIdComment = createRandomIdFromRangeGenerator(1, 750);
const createComment = (quantity) => { // функция, генерирующая комментарии
    let allComments = [];

    for (let i = 0; i < quantity; i++){
        let comment = {
            id: generateIdComment(),
            avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
            message: userComments[getRandomInteger(0, 5)],
            name: userNames[getRandomInteger(0, names.length - 1)]
        }
        allComments.push(comment)
    }

    return allComments
};

const generateId = createRandomIdFromRangeGenerator(1, quantity);
const generateUrl = createRandomIdFromRangeGenerator(1, quantity);

const createPost = (quantity) => { // функция, генерирующая посты
    let posts = []
    for (let i = 0; i < quantity; i++){
        let post = {
            id: generateId(),
            url: `photos/${generateUrl}.jpg`,
            description: photoDescriptions[getRandomInteger(0, photoDescriptions.length -1)],
            likes: getRandomInteger(15,200),
            comments: createComment(getRandomInteger(0, 30))
        }
        posts.push(post)
    }
    return posts

}

let postsFromKekstagram = createPost(25);
