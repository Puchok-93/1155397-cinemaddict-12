"use strict";

const COUNT_MOVIE_CARD = 4;
const COUNT_MOVIE_CARD_EXTRA = 2;

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistic = footer.querySelector(`.footer__statistics`);

let quantityMovies = `130 291`;

/* ----- Функции отрисовки ----- */

const createUserProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

const createSortTemplate = () => {
  return (
    `  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

const createSectionMoviesElementTemplate = () => {
  return (
    `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>

      <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container"></div>
      </section>
    `
  );
};

const createMovieCardTemplate = () => {
  return (
    `<article class="film-card">
    <h3 class="film-card__title">The Dance of Life</h3>
    <p class="film-card__rating">8.3</p>
    <p class="film-card__info">
      <span class="film-card__year">1929</span>
      <span class="film-card__duration">1h 55m</span>
      <span class="film-card__genre">Musical</span>
    </p>
    <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
    <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
    <a class="film-card__comments">5 comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`
  );
};

const createSecionMoviesTemplate = () => `<section class="films"></section>`;
const createShowMoreButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;
const createFooterStatisticTemplate = () => `<p>${quantityMovies} movies inside</p>`;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

/* ----- Рендер ----- */

render(siteHeader, createUserProfileTemplate(), `beforeEnd`);
render(siteMain, createNavigationTemplate(), `beforeEnd`);
render(siteMain, createSortTemplate(), `beforeEnd`);
render(siteMain, createSecionMoviesTemplate(), `beforeEnd`);
render(footerStatistic, createFooterStatisticTemplate(), `beforeEnd`);

const sectionFilms = siteMain.querySelector(`.films`);

render(sectionFilms, createSectionMoviesElementTemplate(), `beforeEnd`);

const filmsList = sectionFilms.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListExtra = sectionFilms.querySelector(`.films-list--extra`);
const filmsExtraContainer = filmsListExtra.querySelector(`.films-list__container`);

for (let i = 0; i <= COUNT_MOVIE_CARD; i++) {
  render(filmsListContainer, createMovieCardTemplate(), `beforeEnd`);
}

render(filmsList, createShowMoreButtonTemplate(), `beforeEnd`);

for (let y = 0; y < COUNT_MOVIE_CARD_EXTRA; y++) {
  render(filmsExtraContainer, createMovieCardTemplate(), `beforeEnd`);
}
