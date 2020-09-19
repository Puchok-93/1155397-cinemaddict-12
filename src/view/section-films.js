
import AbstractView from "./abstract.js";

const createSecionFilmsTemplate = () => `<section class="films"></section>`;

export default class Films extends AbstractView {
  getTemplate() {
    return createSecionFilmsTemplate();
  }
}
