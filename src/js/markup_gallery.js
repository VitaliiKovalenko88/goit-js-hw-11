import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs.js';
import 'material-icons/iconfont/material-icons.css';
const markupPhoto = ({ webformatURL, likes, views, comments, downloads, largeImageURL, tags }) => {
  return `<li class="images-item">
            <a class="photo-card" href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" width="310" height="230"  />
                <div class="stats">
                 <p class="stats-item">
                  <i class="material-icons">thumb_up</i>
                  ${likes}
                 </p>
                 <p class="stats-item">
                  <i class="material-icons">visibility</i>
                   ${views}
                 </p>
                 <p class="stats-item">
                  <i class="material-icons">comment</i>
                   ${comments}
                 </p>
                 <p class="stats-item">
                  <i class="material-icons">cloud_download</i>
                   ${downloads}
                 </p>
                </div>
            </a>
          </li>`;
};

export default img => {
  const galleryMarkup = img.map(markupPhoto).join();

  refs.galleryEl.insertAdjacentHTML('afterbegin', galleryMarkup);
  const lightBox = new SimpleLightbox('.photo-card', {
    captionsData: 'alt',
  });
  lightBox.refresh();
};
