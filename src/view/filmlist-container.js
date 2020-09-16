import AbstractView from "./abstract.js";

const createFilmLIstContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsList extends AbstractView {
  getTemplate() {
    return createFilmLIstContainerTemplate();
  }
}
