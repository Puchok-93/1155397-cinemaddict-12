import AbstractView from "./abstract.js";

const createFilmLIstContainerTemplate = () => {
  return (`<div class="films-list__container"></div>`);
};

export default class FilmContainer extends AbstractView {
  getTemplate() {

    return createFilmLIstContainerTemplate();
  }
}
