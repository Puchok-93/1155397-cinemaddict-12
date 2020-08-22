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
import NoFilmCard from "./view/no-film.js";

const filmsComponent = new SiteFilms();
const filmListComponent = new SectionFilmsList();
const filmListContainerComponent = new FilmListContainer();
const topRatedFilmsComponent = new TopRatedFilms();
const mostcommentedFilmsComponent = new MostcommentedFimls();
const noFilmCardComponent = new NoFilmCard();

const filmsComponentElement = filmsComponent.getElement();

const siteBody = document.body;
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistic = footer.querySelector(`.footer__statistics`);
const cards = generateMovieCards(COUNT_MOVIE_CARD);
const topRatedFilms = getTopRatedFilms(cards, COUNT_MOVIE_CARD_EXTRA);
const mostCommentedFilms = getMostCommentedFilms(cards, COUNT_MOVIE_CARD_EXTRA);
const filters = generateFilters(cards);
const quantityMovies = cards.length;

const EscButton = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

const renderCard = (container, card) => {
  const movieCardComponent = new MovieCard(card);
  const popupCardComponent = new PopupCard(card);
  const popupCardComponentElement = popupCardComponent.getElement();
  const closePopupButton = popupCardComponentElement.querySelector(`.film-details__close-btn`);

  const onCloseButtonClick = () => {
    popupCardComponentElement.remove();
    popupCardComponent.removeElement();
  };

  const onEscButtonKey = (evt) => {
    if (evt.key === EscButton.ESCAPE || evt.key === EscButton.ESC) {
      evt.preventDefault();
      popupCardComponentElement.remove();
      popupCardComponent.removeElement();
      document.removeEventListener(`keydown`, onEscButtonKey);
    }
  };

  const onFilmDetailsClick = (evt) => {
    evt.preventDefault();
    const {target} = evt;

    render(siteBody, popupCardComponentElement);
    const isClickAvalible = CLICK_ITEMS.some((className) => target.classList.contains(className));
    closePopupButton.addEventListener(`click`, onCloseButtonClick);
    document.addEventListener(`keydown`, onEscButtonKey);

    if (isClickAvalible) {
      return;
    }
  };

  movieCardComponent.getElement().addEventListener(`click`, onFilmDetailsClick);

  render(container, movieCardComponent.getElement());
};

render(siteHeader, new UserProfile().getElement());
render(siteMain, new SiteFilter(filters).getElement());
render(siteMain, new SiteSort().getElement());
render(footerStatistic, new FooterStatistic(quantityMovies).getElement());
render(siteMain, filmsComponentElement);
render(filmsComponentElement, filmListComponent.getElement());
render(filmListComponent.getElement(), filmListContainerComponent.getElement());

const count = Math.min(cards.length, COUNT_MOVIE_CARD_STEP);
for (let i = 1; i <= count; i++) {
  renderCard(filmListContainerComponent.getElement(), cards[i]);
}

const renderFilmExtraCard = (cards, container) => {
  return cards.forEach((item) => {
    renderCard(container, item);
  });
};

if (cards.length === 0) {
  render(filmListContainerComponent.getElement(), noFilmCardComponent.getElement());
}

if (topRatedFilms.length !== 0) {
  render(filmsComponentElement, topRatedFilmsComponent.getElement());
  render(topRatedFilmsComponent.getElement(), new FilmListContainer().getElement());
  renderFilmExtraCard(topRatedFilms, topRatedFilmsComponent.getElement().lastElementChild);
}

if (mostCommentedFilms.length !== 0) {
  render(filmsComponentElement, mostcommentedFilmsComponent.getElement());
  render(mostcommentedFilmsComponent.getElement(), new FilmListContainer().getElement());
  renderFilmExtraCard(mostCommentedFilms, mostcommentedFilmsComponent.getElement().lastElementChild);
}

if (cards.length > COUNT_MOVIE_CARD_STEP) {
  let renderedCardCount = COUNT_MOVIE_CARD_STEP;
  const showMoreComponent = new ShowMoreButton();
  render(filmListComponent.getElement(), showMoreComponent.getElement());

  showMoreComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards.slice(renderedCardCount, renderedCardCount + COUNT_MOVIE_CARD_STEP)
    .forEach((card) => renderCard(filmListContainerComponent.getElement(), card));

    renderedCardCount += COUNT_MOVIE_CARD_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreComponent.getElement().remove();
      showMoreComponent.removeElement();
    }
  });
}
