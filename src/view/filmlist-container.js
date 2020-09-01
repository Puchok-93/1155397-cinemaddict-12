import Abstract from "./abstract.js";

const createFilmLIstContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmListContainer extends Abstract {
  getTemplate() {
    return createFilmLIstContainerTemplate();
  }
}
