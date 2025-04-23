import { loadPostsFromLocalStorage, addTextPost } from './posts';
import { getGeolocation } from './geolocation';
import { showModal } from './modal';

document.addEventListener('DOMContentLoaded', () => {
  loadPostsFromLocalStorage();

  const postInput = document.querySelector('.post__input');

  postInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      const text = postInput.value.trim();
      if (text) {
        getGeolocation().then((coords) => {
          addTextPost(text, coords);
          postInput.value = '';
        }).catch(() => {
          showModal(
            `К сожалению, нам не удалось определить ваше местоположение, 
            пожалуйста, дайте разрешение на использование геолокации, 
            либо введите координаты вручную.`,
            addTextPost, text,
          );
        });
      }
    }
  });
});
