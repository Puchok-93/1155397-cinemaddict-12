import Abstract from "./abstract.js";

const createSecionFilmsTemplate = () => `<section class="films"></section>`;

export default class SiteFilms extends Abstract {
  getTemplate() {
    return createSecionFilmsTemplate();
  }
}
