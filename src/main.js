/* View */
import {createUserProfileTemplate} from "./view/user-profile.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createSecionMoviesTemplate} from "./view/section-movies.js";
import {createSectionMoviesElementTemplate} from "./view/section-movies-elements.js";
import {createMovieCardTemplate} from "./view/movie-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFooterStatisticTemplate} from "./view/footer-statistic.js";
import {createPopupTemplate} from "./view/popup.js";

/* Моки */
import {generateFilters} from "./mock/filter.js";
import {generateMovieCards, getTopRatedFilms, getMostCommentedFilms} from "./mock/movie-card.js";

/* Утилитарные */
import {render} from "./utils.js";

/* Константы */
import {COUNT_MOVIE_CARD, COUNT_MOVIE_CARD_STEP, COUNT_MOVIE_CARD_EXTRA} from "./const.js";

const quantityMovies = `130 291`;
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistic = footer.querySelector(`.footer__statistics`);

const cards = generateMovieCards(COUNT_MOVIE_CARD);
const topRatedFilms = getTopRatedFilms(cards, COUNT_MOVIE_CARD_EXTRA);
const mostCommentedFilms = getMostCommentedFilms(cards, COUNT_MOVIE_CARD_EXTRA);
const filters = generateFilters(cards);
const popup = generateMovieCards();

render(siteHeader, createUserProfileTemplate());
render(siteMain, createFilterTemplate(filters));
render(siteMain, createSortTemplate());
render(siteMain, createSecionMoviesTemplate());
render(footerStatistic, createFooterStatisticTemplate(quantityMovies));

const sectionFilms = siteMain.querySelector(`.films`);

render(sectionFilms, createSectionMoviesElementTemplate());

const filmsList = sectionFilms.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelectorAll(`.films-list__container`);

const renderMovieCard = (container, card) => {
  render(container, createMovieCardTemplate(card));
};

const renderMovieCards = (count, container) => {
  for (let i = 0; i < count; i++) {
    renderMovieCard(container, cards[i]);
  }
};

Array.from(filmsListContainer).forEach((item) => {
  if (item.parentElement.children[0].textContent === `Top rated`) {
    renderMovieCards(COUNT_MOVIE_CARD_EXTRA, item, topRatedFilms);
  } else if (item.parentElement.children[0].textContent === `Most commented`) {
    renderMovieCards(COUNT_MOVIE_CARD_EXTRA, item, mostCommentedFilms);
  } else {
    renderMovieCards(Math.min(cards.length, COUNT_MOVIE_CARD_STEP), item, cards);

    if (cards.length > COUNT_MOVIE_CARD_STEP) {
      let renderedFilmsCount = COUNT_MOVIE_CARD_STEP;
      render(filmsList, createShowMoreButtonTemplate());

      const showMoreButton = filmsList.querySelector(`.films-list__show-more`);

      const onShowMoreButtonClick = (evt) => {
        evt.preventDefault();
        cards.slice(renderedFilmsCount, renderedFilmsCount + COUNT_MOVIE_CARD_STEP).forEach((card) => renderMovieCard(item, card));

        renderedFilmsCount += COUNT_MOVIE_CARD_STEP;

        if (renderedFilmsCount >= cards.length) {
          showMoreButton.remove();
        }
      };

      showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
    }
  }
});

render(siteMain, createPopupTemplate(popup[0]));
