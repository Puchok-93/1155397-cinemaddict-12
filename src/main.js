/* View */
import {createUserProfileTemplate} from "./view/user-profile.js";
import {createFilterTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createSecionMoviesTemplate} from "./view/section-movies.js";
import {createSectionMoviesElementTemplate} from "./view/section-movies-elements.js";
import {createMovieCardTemplate} from "./view/movie-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFooterStatisticTemplate} from "./view/footer-statistic.js";
import {createPopupTemplate} from "./view/popup.js";

/* Моки */
import {generateFilter} from "./mock/filter.js";
import {generateMovieCard} from "./mock/movie-card.js";
import {generatePopup} from "./mock/popup.js";

/* Утилитарные */

import {render} from "./utils.js";

/* Константы */

import {COUNT_MOVIE_CARD, COUNT_MOVIE_CARD_STEP} from "./const.js";

const cards = new Array(COUNT_MOVIE_CARD).fill().map(generateMovieCard);
const filters = generateFilter(cards);
const popup = generatePopup(cards);
const quantityMovies = `130 291`;
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistic = footer.querySelector(`.footer__statistics`);

/* ----- Рендер ----- */

render(siteHeader, createUserProfileTemplate());
render(siteMain, createFilterTemplate(filters));
render(siteMain, createSortTemplate());
render(siteMain, createSecionMoviesTemplate());
render(footerStatistic, createFooterStatisticTemplate(quantityMovies));

const sectionFilms = siteMain.querySelector(`.films`);

render(sectionFilms, createSectionMoviesElementTemplate());

const filmsList = sectionFilms.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

const count = Math.min(cards.length, COUNT_MOVIE_CARD_STEP);
for (let i = 0; i < count; i++) {
  render(filmsListContainer, createMovieCardTemplate(cards[i]));
}

if (cards.length > COUNT_MOVIE_CARD_STEP) {
  let renderedMovieCard = COUNT_MOVIE_CARD_STEP;

  render(filmsList, createShowMoreButtonTemplate());

  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    cards
      .slice(renderedMovieCard, renderedMovieCard + COUNT_MOVIE_CARD_STEP)
      .forEach((card) => render(filmsListContainer, createMovieCardTemplate(card)), `afterend`);
    renderedMovieCard += COUNT_MOVIE_CARD_STEP;
    if (renderedMovieCard >= cards.length) {
      showMoreButton.remove();
    }
  });
}

const filmCard = document.querySelector(`.film-card`);
filmCard.addEventListener(`click`, function () {
  render(siteMain, createPopupTemplate(popup));
});
