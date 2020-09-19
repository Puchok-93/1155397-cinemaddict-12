import FilmPresenter from "./film-card.js";
import SortView from "../view/sort.js";
import FilmsView from "../view/section-films";
import SiteFilmsListView from "../view/site-films-list";
import FilmListTitleView from "../view/films-list-title.js";
import FilmContainerView from "../view/filmlist-container.js";
import NoFilmCardView from "../view/no-film.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import {filter} from "../utils/filter.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortByDate, sortByRating, sortByComments} from "../utils/films.js";
import {SortType, UpdateType, UserAction, COUNT_MOVIE_CARD_STEP, EXTRA_FILMS_LIST_TITLES, DEFAULT_FILM_LIST_CLASS, EXTRA_FILMS_LIST_CLASS, COUNT_EXTRA_FILMS_LISTS} from "../const.js";

export default class FilmBoard {
  constructor(movieListContainer, moviesModel, filterModel) {
    this._movieListContainer = movieListContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._sortComponent = null;
    this._showMoreButton = null;
    this._currentSortType = SortType.DEFAULT;
    this._renderedFilms = COUNT_MOVIE_CARD_STEP;

    this._filmContainer = new FilmsView();
    this._siteDefaultFilmsList = new SiteFilmsListView(DEFAULT_FILM_LIST_CLASS);
    this._siteExtraFilmsLists = new Array(COUNT_EXTRA_FILMS_LISTS).fill().map(() => new SiteFilmsListView(EXTRA_FILMS_LIST_CLASS));
    this._siteNoData = new NoFilmCardView();
    this._filmPresenter = new Map();
    this._filmContainers = [];


    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {


    render(this._movieListContainer, this._filmContainer, RenderPosition.BEFOREEND);
    render(this._filmContainer, this._siteDefaultFilmsList, RenderPosition.BEFOREEND);

    this._siteExtraFilmsLists.forEach((element) => {
      render(this._filmContainer, element, RenderPosition.BEFOREEND);
    });

    this._renderMovies();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = [...this._moviesModel.getMovies()];

    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.sort(sortByDate);
      case SortType.RATING:
        return filtredFilms.sort(sortByRating);
    }

    return filtredFilms;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._moviesModel.updateFilms(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._moviesModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._moviesModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, updatedFilm) {
    const arrayOfPresenters = [];

    for (let presenter of this._filmPresenter.keys()) {
      if (presenter === updatedFilm.id) {
        arrayOfPresenters.push(presenter);
      }
    }

    switch (updateType) {
      case UpdateType.PATCH:
        arrayOfPresenters.forEach(function (presenter) {
          this._filmPresenter.get(presenter).init(updatedFilm);
        }, this);
        break;
      case UpdateType.MINOR:
        this._clearMovieList(true);
        this._renderMovies();
        break;
      case UpdateType.MAJOR:
        this._clearMovieList(true, true);
        this._renderMovies();
        break;
    }
  }

  _handleModeChange() {

    for (let presenter of this._filmPresenter.values()) {
      presenter.resetView();
    }

  }

  _renderNoData() {
    render(this._filmsList, this._siteNoData, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(filmContainer, film, i = 0) {
    const filmPresenter = new FilmPresenter(filmContainer, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter.set([film.id, i], filmPresenter);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilmCard(this._filmsContainer, film));
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._moviesModel.getMovies().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilms + COUNT_MOVIE_CARD_STEP);
    this._renderFilms(this._moviesModel.getMovies().slice(this._renderedFilms, newRenderedFilmsCount));
    this._renderedFilms = newRenderedFilmsCount;

    if (this._renderedFilms >= this._moviesModel.getMovies().length) {
      this._showMoreButton.getElement().remove();
    }
  }

  _renderShowMoreButton() {

    if (this._showMoreButton !== null) {
      this._showMoreButton = null;
    }

    this._showMoreButton = new ShowMoreButtonView();
    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);

    render(this._siteDefaultFilmsList, this._showMoreButton, RenderPosition.BEFOREEND);
  }

  _renderExtraFilmsLists(elementContainer, i) {
    const containerId = i + 1;
    const sortedFilms = [...this._moviesModel.getMovies()].sort(this._extraFilmsListSortsTypes[i]).slice(0, 2);

    sortedFilms.forEach((film) => this._renderFilmCard(elementContainer, film, containerId), this);
  }

  _renderExtraFilmsContainers() {
    const newExtraFilmsLists = [];

    this._siteExtraFilmsLists.forEach((element, i) => {

      render(element, new FilmListTitleView(EXTRA_FILMS_LIST_TITLES[i]), RenderPosition.BEFOREEND);

      const elementFilmContainer = new FilmContainerView();

      this._filmContainers.push(elementFilmContainer);

      render(element, elementFilmContainer, RenderPosition.BEFOREEND);
      newExtraFilmsLists.push(elementFilmContainer);
    });

    this._siteExtraFilmsLists = newExtraFilmsLists;

    this._siteExtraFilmsLists.forEach((element, i) => {
      this._renderExtraFilmsLists(element, i);
    }, this);
  }

  _renderFilmList() {
    const films = this._getFilms();
    for (let i = 0; i < Math.min(this._getFilms().length, COUNT_MOVIE_CARD_STEP); i++) {
      this._renderFilmCard(this._filmsContainer, films[i]);
    }

    if (this._getFilms().length > COUNT_MOVIE_CARD_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmContainers() {

    this._filmsContainer = new FilmContainerView();

    this._filmContainers.push(this._filmsContainer);

    render(this._siteDefaultFilmsList, this._filmsContainer, RenderPosition.BEFOREEND);

    this._renderFilmList();
  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMovieList();
    this._renderMovies();
  }

  _clearMovieList(isPopupOppened = false, resetSortType = false) {

    for (let presenter of this._filmPresenter.values()) {
      presenter.destroy(isPopupOppened);
    }

    this._filmPresenter = new Map();
    this._renderedFilms = COUNT_MOVIE_CARD_STEP;
    remove(this._sortComponent);
    remove(this._showMoreButton);
    remove(this._siteNoData);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderSiteSort() {

    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMovies() {

    if (!this._moviesModel.getMovies().length) {
      this._renderNoData();
      return;
    }

    this._renderSiteSort();
    this._extraFilmsListSortsTypes = [sortByRating, sortByComments];

    if (!this._filmContainers.length) {
      this._renderFilmContainers();
      this._renderExtraFilmsContainers();
    } else {
      this._renderFilmList();
      this._siteExtraFilmsLists.forEach((element, i) => {
        this._renderExtraFilmsLists(element, i);
      }, this);
    }
  }
}
