import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const loader = document.querySelector(".loader")
const gallery = document.querySelector(".gallery")
const lightbox = new SimpleLightbox(".gallery a")
const loadMoreBtn = document.querySelector(".loadMoreBtn")
export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, }) => {
        return `<li class="photo-card">
    <a class="gallery-item" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </a>
    <div class="info">
            <p class="info-item"><b>Likes</b><br>${likes}</p>
            <p class="info-item"><b>Views</b><br>${views}</p>
            <p class="info-item"><b>Comments</b><br>${comments}</p>
            <p class="info-item"><b>Downloads</b><br>${downloads}</p>

    </div>
    </li>`}).join("")
    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh()
}
export function clearGallery() {
    gallery.innerHTML = "";
}
export function showLoader(){
    loader.classList.remove("hidden")
}
export function hideLoader() {
    loader.classList.add("hidden")
}
export function showLoadMoreButton() {
    loadMoreBtn.classList.remove('hidden');
  }
  
export function hideLoadMoreButton() {
    loadMoreBtn.classList.add('hidden');
  }