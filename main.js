/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/js/utils.js
/* eslint-disable no-console */
function formatedDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
function parseCoordinates(input) {
  const regex = /^\[?([-+]?[0-9]*\.?[0-9]+),\s*([-+]?[0-9]*\.?[0-9]+)\]?$/;
  const match = input.match(regex);
  if (!match) {
    throw new Error('Invalid format');
  }
  return {
    latitude: parseFloat(match[1]),
    longitude: parseFloat(match[2])
  };
}
;// ./src/js/posts.js
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */


function addTextPost(text, coords) {
  const date = new Date();
  const formattedDate = formatedDate(date);
  const post = {
    type: 'text',
    text,
    coords,
    date: formattedDate
  };
  savePostToLocalStorage(post);
  renderPost(post);
}
function renderPost(post) {
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
function loadPostsFromLocalStorage() {
  const posts = localStorage.getItem('posts');
  if (posts) {
    try {
      const parsedPosts = JSON.parse(posts);
      parsedPosts.forEach(post => renderPost(post));
    } catch (error) {
      console.error('Ошибка при разборе данных из локального хранилища:', error);
      localStorage.removeItem('posts');
    }
  } else {
    console.log('Нет сохраненных постов');
  }
}
;// ./src/js/geolocation.js
// eslint-disable-next-line import/prefer-default-export
function getGeolocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        resolve(coords);
      }, () => {
        reject();
      });
    } else {
      reject();
    }
  });
}
;// ./src/js/modal.js
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-alert */

function showModal(message, callback, content) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal__content">
      <div class="modal__text">Что-то пошло не так</div>
      <p class="modal__text">${message}</p>
      <div class="modal__text">Широта и долгота через запятую</div>
      <input type="text" class="manual__coords" placeholder="51.50851, -0.12572">
      <div class="modal__btns">
        <button class="close__modal">Отмена</button>
        <button class="submit__coords">Ок</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.querySelector('.submit__coords').addEventListener('click', () => {
    const coordsInput = document.querySelector('.manual__coords').value.trim();
    try {
      const coords = parseCoordinates(coordsInput);
      callback(content, coords);
      document.body.removeChild(modal);
    } catch (error) {
      alert(error.message);
    }
  });
  document.querySelector('.close__modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}
;// ./src/js/app.js



document.addEventListener('DOMContentLoaded', () => {
  loadPostsFromLocalStorage();
  const postInput = document.querySelector('.post__input');
  postInput.addEventListener('keypress', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = postInput.value.trim();
      if (text) {
        getGeolocation().then(coords => {
          addTextPost(text, coords);
          postInput.value = '';
        }).catch(() => {
          showModal(`К сожалению, нам не удалось определить ваше местоположение, 
            пожалуйста, дайте разрешение на использование геолокации, 
            либо введите координаты вручную.`, addTextPost, text);
        });
      }
    }
  });
});
;// ./src/index.js


/******/ })()
;