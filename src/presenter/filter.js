import FilterView from "../view/filter.js";
import {getFiltersCount} from "../utils/filter.js";
import {RenderPosition, render, replace, remove} from "../utils/render.js";
import {UpdateType} from "../const.js";

export default class Filter {
  constructor(navigationContainer, filterModel, moviesModel) {
    this._navigationContainer = navigationContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;

    this._currentFilter = null;
    this._navigationComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();

    const prevNavigationComponent = this._navigationComponent;
    this._navigationComponent = new FilterView(filters, this._currentFilter);
    this._navigationComponent.setFilterChangeHandler(this._handleFilterChange);

    if (prevNavigationComponent === null) {
      render(this._navigationContainer, this._navigationComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(prevNavigationComponent, this._navigationComponent);
    remove(prevNavigationComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const movies = this._moviesModel.getMovies();

    return getFiltersCount(movies);
  }
}
