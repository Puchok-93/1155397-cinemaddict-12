import {getTopRatedFilms, getMostCommentedFilms} from "../mock/movie-card.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {sortByRating, sortByDate} from "../utils/sort-film.js";
import {SortType, COUNT_MOVIE_CARD_STEP, COUNT_MOVIE_CARD_EXTRA} from "../const.js";

import SiteFilms from "../view/section-films.js";
import SiteSort from "../view/sort.js";
import SectionFilmsList from "../view/films-list.js";
import FilmListContainer from "../view/filmlist-container.js";
import TopRatedFilms from "../view/top-rated.js";
import MostcommentedFilms from "../view/most-commented.js";
import ShowMoreButton from "../view/show-more-button.js";
import NoFilmCard from "../view/no-film.js";

import FilmCard from "./film-card.js";

const siteMain = document.querySelector(`.main`);

export default class FilmBoard {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedFilmsCount = COUNT_MOVIE_CARD_STEP;
    this._renderedFilmsExtraCount = COUNT_MOVIE_CARD_EXTRA;
    this._currentSortType = SortType.DEFAULT;

    this._filmsComponent = new SiteFilms();
    this._filmSortComponent = new SiteSort();
    this._noFilmCardComponent = new NoFilmCard();

    this._mainFilmListComponent = new SectionFilmsList();
    this._topRatedFilmsComponent = new TopRatedFilms();
    this._mostcommentedFilmsComponent = new MostcommentedFilms();

    this._allFilmsListComponent = new FilmListContainer();
    this._topRatedFilmsListComponent = new FilmListContainer();
    this._mostCommentedFilmsListComponent = new FilmListContainer();

    this._renderedFilmsFrom = 0;
    this._renderedFilmsTo = 0;

    this._showMoreButtonComponent = new ShowMoreButton();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedCards = films.slice();

    this._topRatedFilms = getTopRatedFilms(this._films);
    this._mostCommentedFilms = getMostCommentedFilms(this._films);

    this._renderFilmSort();
    render(this._movieListContainer, this._filmsComponent);

    this._renderFilmLists();
  }

  /* --------------------------------------------- Сортируем фильмы --------------------------------------------- */

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortByDate);
        break;
      case SortType.RATING:
        this._films.sort(sortByRating);
        break;
      default:
        this._films = this._sourcedCards.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderAllMovies();
  }

  /* --------------------------------------------- Очищаем основной список фильмов ------------------------------------------------- */

  _clearFilmList() {
    this._allFilmsListComponent.getElement().innerHTML = ``;
    this._renderedFilmsCount = COUNT_MOVIE_CARD_STEP;
    this._renderedFilmsFrom = 0;
    this._renderedFilmsTo = 0;
  }

  /* --------------------------------------------- Рендерим сортировку фильмов ------------------------------------------------- */

  _renderFilmSort() {
    render(siteMain, this._filmSortComponent);
    this._filmSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  /* --------------------------------------------- Рендерим карточку фильма ------------------------------------------------- */

  _renderFilmCard(container, film) {
    const filmPresenter = new FilmCard(container);
    filmPresenter.init(film);
  }

  /* --------------------------------------------- Рендерим фильмы ------------------------------------------------- */

  _renderFilms(container, films, from, to) {
    films.slice(from, to)
    .forEach((film) => this._renderFilmCard(container, film));
  }

  /* --------------------------------------------- Рендерим заглушку, если нет фильмов ------------------------------------------------- */

  _renderNoFilmCard() {
    render(this._filmsComponent, this._noFilmCardComponent);
  }

  /* ---------------------------------------------Рендерим кнопку показать больше ------------------------------------------------- */

  _renderShowMoreButton() {
    render(this._mainFilmListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandlerButton(this._handleShowMoreButtonClick);
  }

  _handleShowMoreButtonClick() {
    this._calculateRange();
    this._renderMovies();

    if (this._renderedFilmsTo >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  /* --------------------------------------------- Вычисляем диапазон карточек фильмов  ------------------------------------------------- */

  _calculateRange() {
    this._renderedFilmsFrom = this._renderedFilmsTo;
    this._renderedFilmsTo = Math.min(this._films.length, (this._renderedFilmsFrom + COUNT_MOVIE_CARD_STEP));
  }

  /* --------------------------------------------- Рендерим карточки фильмов  ------------------------------------------------- */

  _renderMovies() {
    this._renderFilms(this._allFilmsListComponent, this._films, this._renderedFilmsFrom, this._renderedFilmsTo);
  }

  /* ---------------------------------------------Рендерим основной блок с фильмами  ------------------------------------------------- */

  _renderAllMovies() {
    render(this._mainFilmListComponent, this._allFilmsListComponent);
    render(this._filmsComponent, this._mainFilmListComponent, RenderPosition.AFTERBEGIN);

    this._calculateRange();
    this._renderMovies();

    if (this._films.length > COUNT_MOVIE_CARD_STEP) {
      this._renderShowMoreButton();
    }
  }

  /* --------------------------------------------- Рендерим top rated блок  ------------------------------------------------- */

  _renderTopRatedFilms() {
    this._renderFilms(this._topRatedFilmsListComponent, this._topRatedFilms, 0, this._renderedFilmsExtraCount);
    render(this._filmsComponent, this._topRatedFilmsComponent);
    render(this._topRatedFilmsComponent, this._topRatedFilmsListComponent);
  }

  /* --------------------------------------------- Рендерим most commented блок  ------------------------------------------------- */

  _renderMostCommented() {
    this._renderFilms(this._mostCommentedFilmsListComponent, this._mostCommentedFilms, 0, this._renderedFilmsExtraCount);
    render(this._filmsComponent, this._mostcommentedFilmsComponent);
    render(this._mostcommentedFilmsComponent, this._mostCommentedFilmsListComponent);
  }

  /* ---------------------------------------------Рендерим блоки с фильмами ------------------------------------------------- */

  _renderFilmLists() {
    if (this._films.length === 0) {
      this._renderNoFilmCard();
      return;
    }

    this._renderAllMovies();
    this._renderTopRatedFilms();
    this._renderMostCommented();
  }
}
