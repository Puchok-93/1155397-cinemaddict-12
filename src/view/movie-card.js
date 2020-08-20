import {createElement} from "../utils.js";

const createMovieCardTemplate = (card) => {
  const {title, poster, rating, year, duration, description, isWatch, isHistory, isFavorites, genre, comment} = card;

  const isWatchClassName = isWatch ? `film-card__controls-item--active` : `film-card__controls-item`;
  const isHistoryClassName = isHistory ? `film-card__controls-item--active` : `film-card__controls-item`;
  const isFavoriteClassName = isFavorites ? `film-card__controls-item--active` : `film-card__controls-item`;
  const numberOfComments = comment === 1 ? comment + ` comment` : comment + ` comments`;
  const decimalRating = (rating / 10).toFixed(1);

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${decimalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
       <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${numberOfComments}</a>
    <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchClassName}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isHistoryClassName}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteClassName}">Mark as favorite</button>
    </form>
  </article>`
  );
};

export default class MovieCard {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createMovieCardTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

