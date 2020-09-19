import AbstractView from "./abstract.js";
import {dateFilm, durationFilm} from "../utils/films.js";
import {ANONS_DESCRIPTION_LENGTH} from "../const";

const createDescription = (description) => {
  const text = `${description.join(`. `)}.`;

  return (text.length > 140) ? `${text.substring(0, ANONS_DESCRIPTION_LENGTH)}...` : text;
};

const createMovieCardTemplate = (film) => {
  const {title, rating, date, duration, genres, description, poster, comments, isWatchList, isWatched, isFavorite} = film;
  const numberOfComments = comments.length === 1 ? `${comments.length} comment` : `${comments.length} comments`;
  const watchlistButtonClass = (isWatchList) ? `film-card__controls-item--active` : ``;
  const watchedButtonClass = (isWatched) ? `film-card__controls-item--active` : ``;
  const favoriteButtonClass = (isFavorite) ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dateFilm(date)}</span>
      <span class="film-card__duration">${durationFilm(duration)}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="${title}" class="film-card__poster">
    <p class="film-card__description">${createDescription(description)}</p>
    <a class="film-card__comments">${numberOfComments}</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButtonClass}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedButtonClass}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteButtonClass}">Mark as favorite</button>
    </form>
  </article>`
  );
};

export default class MovieCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._addToWatchedClickHandler = this._addToWatchedClickHandler.bind(this);
    this._addToFavoriteClickHandler = this._addToFavoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchListClick();
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addToWatchListClickHandler);
  }

  _addToWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchedClick();
  }

  setAddToWatchedClickHandler(callback) {
    this._callback.addToWatchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._addToWatchedClickHandler);
  }

  _addToFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavoriteClick();
  }

  setAddToFavoriteClickHandler(callback) {
    this._callback.addToFavoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._addToFavoriteClickHandler);
  }
}
