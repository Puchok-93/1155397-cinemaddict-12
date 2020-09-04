import Abstract from "./abstract.js";

const createMovieCardTemplate = (film) => {
  const {title, poster, rating, year, duration, description, isWatch, isHistory, isFavorites, genre, comments} = film;

  const isWatchClassName = isWatch ? `film-card__controls-item--active` : `film-card__controls-item`;
  const isHistoryClassName = isHistory ? `film-card__controls-item--active` : `film-card__controls-item`;
  const isFavoriteClassName = isFavorites ? `film-card__controls-item--active` : `film-card__controls-item`;
  const numberOfComments = comments.length === 1 ? `${comments.length} comment` : `${comments.length} comments`;

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

export default class MovieCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._filmDetailsClickHandler = this._filmDetailsClickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._film);
  }

  _filmDetailsClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
      this._callback.filmDetailsClick();
    }
  }

  setFilmDetailsClickHandler(callback) {
    this._callback.filmDetailsClick = callback;
    this.getElement().addEventListener(`click`, this._filmDetailsClickHandler);
  }
}

