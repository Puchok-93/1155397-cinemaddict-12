/* Моки */
import {generateFilters} from "./mock/filter.js";
import {generateMovieCards, getTopRatedFilms, getMostCommentedFilms} from "./mock/movie-card.js";

/* Утилитарные */
import {render} from "./utils.js";

/* Константы */
import {COUNT_MOVIE_CARD, COUNT_MOVIE_CARD_STEP, CLICK_ITEMS, COUNT_MOVIE_CARD_EXTRA} from "./const.js";

/* Классы */
import UserProfile from "./view/user-profile.js";
import SiteFilter from "./view/filter.js";
import SiteSort from "./view/sort.js";
import SiteFilms from "./view/section-films.js";
import SectionFilmsList from "./view/films-list.js";
import FilmListContainer from "./view/filmlist-container.js";
import TopRatedFilms from "./view/top-rated.js";
import MostcommentedFimls from "./view/most-commented";
import MovieCard from "./view/movie-card.js";
import PopupCard from "./view/popup.js";
import ShowMoreButton from "./view/show-more-button.js";
import FooterStatistic from "./view/footer-statistic.js";

const filmsComponent = new SiteFilms();
const filmListComponent = new SectionFilmsList();
const filmListContainerComponent = new FilmListContainer();
const topRatedFilmsComponent = new TopRatedFilms();
const mostcommentedFilmsComponent = new MostcommentedFimls();

const filmsComponentElement = filmsComponent.getElement();
const filmListComponentElement = filmListComponent.getElement();
const filmListContainerComponentElement = filmListContainerComponent.getElement();
const topRatedFilmsComponentElement = topRatedFilmsComponent.getElement();
const mostcommentedFilmsComponentElement = mostcommentedFilmsComponent.getElement();

const quantityMovies = `130 291`;
const siteBody = document.querySelector(`body`);
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistic = footer.querySelector(`.footer__statistics`);
const cards = generateMovieCards(COUNT_MOVIE_CARD);
const topRatedFilms = getTopRatedFilms(cards, COUNT_MOVIE_CARD_EXTRA);
const mostCommentedFilms = getMostCommentedFilms(cards, COUNT_MOVIE_CARD_EXTRA);
const filters = generateFilters(cards);

const renderCard = (container, card) => {
  const movieCardComponent = new MovieCard(card);
  const popupCardComponent = new PopupCard(card);

  const onCloseButtonClick = () => {
    popupCardComponent.getElement().remove();
    popupCardComponent.removeElement();
  };

  const onFilmDetailsClick = () => {
    render(siteBody, popupCardComponent.getElement());

    popupCardComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseButtonClick);
  };

  movieCardComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const {target} = evt;

    const isClickAvalible = CLICK_ITEMS.some((className) => target.classList.contains(className));

    if (isClickAvalible) {
      return;
    }

    onFilmDetailsClick();
  });

  render(container, movieCardComponent.getElement());
};

render(siteHeader, new UserProfile().getElement());
render(siteMain, new SiteFilter(filters).getElement());
render(siteMain, new SiteSort().getElement());
render(footerStatistic, new FooterStatistic(quantityMovies).getElement());

render(siteMain, filmsComponentElement);
render(filmsComponentElement, filmListComponentElement);
render(filmListComponentElement, filmListContainerComponentElement);

const count = Math.min(cards.length, COUNT_MOVIE_CARD_STEP);
for (let i = 1; i <= count; i++) {
  renderCard(filmListContainerComponentElement, cards[i]);
}

render(filmsComponentElement, topRatedFilmsComponentElement);
render(filmsComponentElement, mostcommentedFilmsComponentElement);

render(topRatedFilmsComponentElement, new FilmListContainer().getElement());
render(mostcommentedFilmsComponentElement, new FilmListContainer().getElement());

const renderFilmExtraCard = (extraCard, container) => {
  return cards.forEach((item) => {
    renderCard(container, item);
  });
};

renderFilmExtraCard(topRatedFilms, topRatedFilmsComponentElement.lastElementChild);
renderFilmExtraCard(mostCommentedFilms, mostcommentedFilmsComponentElement.lastElementChild);

if (cards.length > COUNT_MOVIE_CARD_STEP) {
  let renderedCardCount = COUNT_MOVIE_CARD_STEP;
  const showMoreComponent = new ShowMoreButton();
  render(filmListComponentElement, showMoreComponent.getElement());

  showMoreComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards.slice(renderedCardCount, renderedCardCount + COUNT_MOVIE_CARD_STEP)
    .forEach((card) => renderCard(filmListContainerComponentElement, card));

    renderedCardCount += COUNT_MOVIE_CARD_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreComponent.getElement().remove();
      showMoreComponent.removeElement();
    }
  });
}
