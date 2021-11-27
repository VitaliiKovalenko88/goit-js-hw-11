import './sass/main.scss';
import createMarkupGallery from './js/markup_gallery.js';
import Gallery from './js/pixabay-servise.js';
import refs from './js/refs.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const gallery = new Gallery();

const onClickSearchBtn = e => {
  e.preventDefault();

  gallery.requestQuery = e.currentTarget.elements.query.value.trim();

  if (gallery.requestQuery === '') {
    clearGalleryContainer();
    refs.loadMoreBtn.classList.add('is-hiden');
    Notify.failure("You haven't written anything yet!!!");
    return;
  }
  gallery.resetPage();
  clearGalleryContainer();
  onSeachPhoto();
};

const onSeachPhoto = async () => {
  console.log(gallery.page);
  const { hits, totalHits } = await gallery.getGalerry();
  console.log(hits);
  refs.loadMoreBtn.classList.remove('is-hidden');
  createMarkupGallery(hits);
};

const onClickLoadMoreBtn = () => {
  gallery.incrementPage();
  onSeachPhoto();
};

const clearGalleryContainer = () => {
  refs.galleryEl.innerHTML = '';
};

refs.form.addEventListener('submit', onClickSearchBtn);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);
