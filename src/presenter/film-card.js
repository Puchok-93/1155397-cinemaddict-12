import MovieCardView from "../view/movie-card.js";
import PopupView from "../view/popup.js";
import CommentPresenter from "./comment.js";
import {render, replace, remove} from "../utils/render.js";
import {Mode, UserAction, UpdateType, EscButton} from "../const.js";

const body = document.querySelector(`body`);

export default class Film {
  constructor(filmContainer, changeFilm, changeMode, commentsModel) {
    this._filmContainer = filmContainer;
    this._popUpContainer = body;
    this._changeFilm = changeFilm;
    this._changeMode = changeMode;
    this._commentsModel = commentsModel;

    this._filmCardComponent = null;
    this._popUpComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleModelCommentsUpdate = this._handleModelCommentsUpdate.bind(this);
    this._handlePopUpCommentsRender = this._handlePopUpCommentsRender.bind(this);
    this._handleShortcutKeysDown = this._handleShortcutKeysDown.bind(this);
    this._handleFilmDetailsClick = this._handleFilmDetailsClick.bind(this);
    this._handleControlsChange = this._handleControlsChange.bind(this);
    this._handleToggleChange = this._handleToggleChange.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._commentsModel.addObserver(this._handleModelCommentsUpdate);
  }

  init(film) {
    this._film = film;
    this._emoji = null;
    this._newComment = null;
    this._isPopUpReOpened = false;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopUpComponent = this._popUpComponent;

    if (prevPopUpComponent) {
      this._emoji = prevPopUpComponent.restoreEmoji();
      this._newComment = prevPopUpComponent.restoreNewComment();
    }

    this._filmCardComponent = new MovieCardView(film);
    this._popUpComponent = new PopupView(film, this._emoji, this._newComment, this._handlePopUpCommentsRender);
    this._popUpComponent.setSubmitCommentHandler(this._handleShortcutKeysDown);

    this._filmCardComponent.setFilmDetailsClickHandler(this._handleFilmDetailsClick);
    this._filmCardComponent.setControlsClickHandler(this._handleControlsChange);
    this._popUpComponent.setControlsToggleHandler(this._handleToggleChange);
    this._popUpComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);

    if (prevFilmCardComponent === null || prevPopUpComponent === null) {
      render(this._filmContainer, this._filmCardComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT || this._mode === Mode.POPUP) {
      replace(prevFilmCardComponent, this._filmCardComponent);
    }

    if (this._mode === Mode.POPUP) {
      replace(prevPopUpComponent, this._popUpComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopUpComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popUpComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopUp();
    }
  }

  _openPopUp() {
    render(this._popUpContainer, this._popUpComponent);
    if (this._isPopUpReOpened) {
      this._popUpComponent.restoreHandlers();
    }
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _closePopUp() {
    this._isPopUpReOpened = true;
    this._popUpComponent.reset(this._film);
    remove(this._popUpComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
    this._changeFilm(UserAction.UPDATE, UpdateType.MINOR, this._film);
  }

  _handleModelCommentsUpdate(updateType, updatedComment, filmID) {
    if (this._film.id === filmID) {
      switch (updateType) {
        case UserAction.ADD:
          this._film.comments = Array.from(new Set([...this._film.comments, updatedComment]));
          break;
        case UserAction.DELETE:
          this._film.comments = this._film.comments.filter((comment) => comment.id !== updatedComment.id);
          break;
      }

      this._changeFilm(UserAction.UPDATE, UpdateType.PATCH, this._film);
    }
  }

  _handlePopUpCommentsRender(container) {
    const comments = this._commentsModel.getComments()[this._film.id];
    const commentPresenter = new CommentPresenter(container, this._film.id, this._changeFilm);
    comments.forEach((comment) => commentPresenter.init(comment));
  }

  _handleShortcutKeysDown(container, newComment) {
    const newCommentPresenter = new CommentPresenter(container, this._film.id, this._changeFilm);
    newCommentPresenter.init(newComment);
    this._changeFilm(UserAction.ADD, UserAction.ADD, newComment, this._film.id);
    this._popUpComponent.reset(this._film);
  }

  _handleControlsChange(film) {
    this._changeFilm(UserAction.UPDATE, UpdateType.MINOR, film);
  }

  _handleToggleChange(film) {
    this._changeFilm(UserAction.UPDATE, UpdateType.PATCH, film);
  }

  _handleFilmDetailsClick() {
    this._openPopUp();
  }

  _handleCloseButtonClick() {
    this._closePopUp();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === EscButton.ESCAPE || evt.key === EscButton.ESC) {
      evt.preventDefault();
      this._closePopUp();
    }
  }
}
