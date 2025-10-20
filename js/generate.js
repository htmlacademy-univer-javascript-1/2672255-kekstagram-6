import { getRandomInteger, createRandomIdFromRangeGenerator } from './util.js';
import { userNames, userComments, photoDescriptions } from './data.js';

const generateIdComment = createRandomIdFromRangeGenerator(1, 750);

export const createComment = (quantity) => {
  const allComments = [];
  for (let i = 0; i < quantity; i++) {
    const comment = {
      id: generateIdComment(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: userComments[getRandomInteger(0, userComments.length - 1)],
      name: userNames[getRandomInteger(0, userNames.length - 1)]
    };
    allComments.push(comment);
  }
  return allComments;
};

export const createPost = (quantity) => {
  const generateId = createRandomIdFromRangeGenerator(1, quantity);
  const generateUrl = createRandomIdFromRangeGenerator(1, quantity);

  const posts = [];
  for (let i = 0; i < quantity; i++) {
    const post = {
      id: generateId(),
      url: `photos/${generateUrl()}.jpg`,
      description: photoDescriptions[getRandomInteger(0, photoDescriptions.length - 1)],
      likes: getRandomInteger(15, 200),
      comments: createComment(getRandomInteger(0, 30))
    };
    posts.push(post);
  }
  return posts;
};
