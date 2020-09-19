import AbstractView from "./abstract.js";
import {formatDateComment} from "../utils/films.js";
import {emojiMap} from "../const.js";

const createComments = (comments) => {

  if (comments.length === 0) {
    return ``;
  }

  let result = [];

  for (let i = 0; i < comments.length; i++) {
    let comment =
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="${comments[i].img}" width="55" height="55" alt="emoji-${comments[i].emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${comments[i].text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comments[i].name}</span>
          <span class="film-details__comment-day">${formatDateComment(comments[i].date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
    result.push(comment);
  }
  return result.join(``);
};

const createUserEmojiTemplate = (userEmoji) => {
  return userEmoji === `` ? `` : `<img src="${emojiMap[userEmoji]}" width="55" height="55" alt="emoji-smile">`;
};

const createFilmDetailsComments = (comments, userEmoji) => {
  const numberOfComments = comments.length === 1 ? `Comment` : `Comments`;
  return (
    `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">${numberOfComments} <span class="film-details__comments-count">${comments.length}</span></h3>

    <ul class="film-details__comments-list">
      ${createComments(comments)}
    </ul>

    <div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${createUserEmojiTemplate(userEmoji)}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>
  </section>`
  );
};

export default class DetailsComments extends AbstractView {
  constructor(comments, userEmoji) {
    super();
    this._comments = comments;
    this._userEmoji = userEmoji;
  }

  getTemplate() {
    return createFilmDetailsComments(this._comments, this._userEmoji);
  }
}
