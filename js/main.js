import { createPosts } from './data.js';
import { renderPictures } from './miniatures.js';

// Генерируем 25 постов
const postsFromKekstagram = createPosts(25);

// Отрисовываем их на странице
renderPictures(postsFromKekstagram);
