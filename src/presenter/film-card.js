import MovieCardView from "../view/movie-card.js";
import PopupView from "../view/popup.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {buttonCode} from "../const.js";
import {UserAction, UpdateType, Mode} from "../const.js";

export default class Film {
  constructor(filmContainer, changeFilm, changeMode) {
    this._filmContainer = filmContainer;
    this._changeFilm = changeFilm;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._popupComponent = null;

    this._mode = Mode.DEFAULT;

    this._updateCard = this._updateCard.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._addToWatchedClickHandler = this._addToWatchedClickHandler.bind(this);
    this._addToFavoriteClickHandler = this._addToFavoriteClickHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._clickClosePopupHandler = this._clickClosePopupHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._addCommentKeyDown = this._addCommentKeyDown.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new MovieCardView(film);
    this._popupComponent = new PopupView(film, this._updateCard);

    this._filmCardComponent.setClickHandler(this._clickHandler);
    this._filmCardComponent.setAddToWatchListClickHandler(this._addToWatchListClickHandler);
    this._filmCardComponent.setAddToWatchedClickHandler(this._addToWatchedClickHandler);
    this._filmCardComponent.setAddToFavoriteClickHandler(this._addToFavoriteClickHandler);
    this._popupComponent.setDeleteClickHandler(this._deleteClickHandler);
    this._popupComponent.setAddCommentKeyDown(this._addCommentKeyDown);

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      render(this._filmContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._mode === Mode.POPUP) {
      this._popupComponent.setCloseClickHandler(this._clickClosePopupHandler);
      this._popupComponent.setKeydownHandler(this._escKeyDownHandler);
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _updateCard(film) {
    this._film = film;
    const prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new MovieCardView(film);

    this._filmCardComponent.setClickHandler(this._clickHandler);
    this._filmCardComponent.setAddToWatchListClickHandler(this._addToWatchListClickHandler);
    this._filmCardComponent.setAddToWatchedClickHandler(this._addToWatchedClickHandler);
    this._filmCardComponent.setAddToFavoriteClickHandler(this._addToFavoriteClickHandler);

    replace(this._filmCardComponent, prevFilmCardComponent);
  }

  destroy(isPopupOppened) {
    remove(this._filmCardComponent);
    if (!isPopupOppened) {
      remove(this._popupComponent);
    }
  }

  _closePopup() {
    this._mode = Mode.DEFAULT;
    document.querySelector(`.film-details`).remove();

    this._popupComponent.removeCloseHandlers();
  }

  _escKeyDownHandler(evt) {

    if (evt.key === buttonCode.ESCAPE || evt.key === buttonCode.ESC) {
      evt.preventDefault();
      this._popupComponent.reset(this._film);
      this._mode = Mode.DEFAULT;
      this._closePopup();
    }
  }

  _addToWatchListClickHandler() {
    this._changeFilm(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isWatchList: !this._film.isWatchList
            }
        )
    );
  }

  _addToWatchedClickHandler() {
    this._changeFilm(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _addToFavoriteClickHandler() {
    this._changeFilm(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _openPopup() {
    this._popupComponent.setCloseClickHandler(this._clickClosePopupHandler);
    this._popupComponent.setKeydownHandler(this._escKeyDownHandler);
    document.body.appendChild(this._popupComponent.getElement());
  }

  _clickHandler() {
    this._openPopup();
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _clickClosePopupHandler() {
    this._closePopup();
    this._mode = Mode.DEFAULT;
  }

  _deleteClickHandler(film) {
    this._changeFilm(
        UserAction.DELETE_COMMENT,
        UpdateType.MINOR,
        film);
  }

  _addCommentKeyDown(film) {
    this._changeFilm(
        UserAction.ADD_COMMENT,
        UpdateType.MINOR,
        film);
  }
}
