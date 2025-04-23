/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

import { formatedDate } from './utils';

export function addTextPost(text, coords) {
  const date = new Date();
  const formattedDate = formatedDate(date);
  const post = {
    type: 'text',
    text,
    coords,
    date: formattedDate,
  };

  savePostToLocalStorage(post);
  renderPost(post);
}

export function renderPost(post) {
  const timeline = document.querySelector('.timeline');
  if (!timeline) {
    console.error('Элемент .timeline не найден в DOM');
    return;
  }

  const postElement = document.createElement('div');
  postElement.className = 'post';

  const postContainer = document.createElement('div');
  postContainer.className = 'post__container';

  if (post.type === 'text') {
    const textElement = document.createElement('p');
    textElement.className = 'post__text';
    textElement.textContent = post.text;
    postContainer.appendChild(textElement);
  }

  const dateElement = document.createElement('div');
  dateElement.className = 'date';
  dateElement.textContent = post.date;
  postContainer.appendChild(dateElement);

  const coordsElement = document.createElement('div');
  coordsElement.className = 'coords';
  coordsElement.textContent = `[${post.coords.latitude}, ${post.coords.longitude}]`;

  postElement.appendChild(postContainer);
  postElement.appendChild(coordsElement);

  timeline.prepend(postElement);
}

function savePostToLocalStorage(post) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
}

export function loadPostsFromLocalStorage() {
  const posts = localStorage.getItem('posts');

  if (posts) {
    try {
      const parsedPosts = JSON.parse(posts);
      parsedPosts.forEach((post) => renderPost(post));
    } catch (error) {
      console.error('Ошибка при разборе данных из локального хранилища:', error);
      localStorage.removeItem('posts');
    }
  } else {
    console.log('Нет сохраненных постов');
  }
}
