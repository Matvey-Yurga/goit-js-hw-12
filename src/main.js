import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, hideLoadMoreButton, showLoadMoreButton } from "./js/render-functions";
const form = document.querySelector(".form")
const loadMoreBtn = document.querySelector(".loadMoreBtn")
let currentPage = 0;
const perPage = 15;
let currentQuery = '';
let totalHits = 0;
 hideLoadMoreButton();
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    currentQuery = e.target.elements['search-text'].value.trim()
    if (!currentQuery) return;
    currentPage = 1;
    showLoadMoreButton()
    clearGallery()
    showLoader()
try {
    const res = await getImagesByQuery(currentQuery, currentPage);
    totalHits = res.totalHits
    createGallery(res.hits);
    hideLoader();
    if (res.hits.length === 0) {
        iziToast.warning({
                message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight',
        })
        return;
    }
    const totalPages = Math.ceil(totalHits / perPage)
    if (currentPage >= totalPages) {
        hideLoadMoreButton();
    } else {
        showLoadMoreButton();
    }
} catch (error) {
    console.error(error);
    hideLoader();
        iziToast.error({
            message: 'Something went wrong. Please try again later.',
            position: 'topRight', })
}

});
loadMoreBtn.addEventListener("click", async (e) => {
    currentPage += 1
    showLoader();
    try {
        const res = await getImagesByQuery(currentQuery, currentPage);
        hideLoader();
        createGallery(res.hits);
         scrollPage();
        const totalPages = Math.ceil(totalHits / perPage);
        if (currentPage >= totalPages) {
          iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
          });
          hideLoadMoreButton();
        }
    } catch (error) {
      console.error(error);
      iziToast.error({ message: 'Something went wrong while loading more images.', position: 'topRight' });
    }
});
  
function scrollPage() {
    const galleryItem = document.querySelector('.gallery .photo-card');
    if (galleryItem) {
      const { height: cardHeight } = galleryItem.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  }