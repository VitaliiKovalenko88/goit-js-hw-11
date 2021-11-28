import './sass/main.scss';
import refs from './js/refs.js';
import Gallery from './js/pixabay-servise.js';
import createMarkupGallery from './js/markup_gallery.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const gallery = new Gallery();

refs.form.addEventListener('submit', onClickSearchBtn);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

function onClickSearchBtn(e) {
  e.preventDefault();
  clearGalleryContainer();

  gallery.requestQuery = e.target.elements.query.value.trim();

  if (gallery.requestQuery === '') {
    clearGalleryContainer();

    Notify.failure("You haven't written anything yet!!!");
    return;
  }
  gallery.resetPage();
  onFetchSeachPhoto();
}

async function onFetchSeachPhoto() {
  try {
    const isHidden = refs.loadMoreBtn.classList.contains('is-hidden');
    const { hits, totalHits } = await gallery.getGalerry();

    if (totalHits === 0) {
      Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      hideLoadMoreBtn();
      return;
    }

    if (totalHits > 0) {
      Notify.success(`Hooray! We found ${totalHits} images...`);
    }

    createMarkupGallery(hits);

    if (isHidden) {
      const { height: cardHeight } = refs.galleryEl.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 0.4,
        behavior: 'smooth',
      });
    }

    showLoadMoreBtn();
  } catch {
    hideLoadMoreBtn();
    Notify.failure("We're sorry, but you've reached the end of search results.");
  }
}

async function onClickLoadMoreBtn() {
  await onFetchSeachPhoto();
  const { height: cardHeight } = refs.galleryEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3.2,
    behavior: 'smooth',
  });
}

function clearGalleryContainer() {
  refs.galleryEl.innerHTML = '';
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
