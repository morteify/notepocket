import { Note } from './Note.js';

export class Excerpt {
  constructor(note) {
    this._title = note ? note.title : '';
    this._content = note ? note.content : '';
    this._date = note ? note.date : '';
    this.tags = [];
    this.createExcerptElement();
  }

  set title(newValue) {
    this._title = newValue;
  }

  set content(newValue) {
    this._content = newValue;
  }

  set date(newValue) {
    this._date = newValue;
  }

  createExcerptElement = id => {
    const elem = document.createElement('div');
    elem.id = id;
    elem.classList.add('excerpt');
    const title = document.createElement('p');
    title.classList.add(`excerpt__title-${id}`);
    title.innerText = this._title;
    const date = document.createElement('p');
    date.classList.add(`excerpt__date-${id}`);
    const noteFragment = document.createElement('p');
    noteFragment.classList.add(`excerpt__noteFragment-${id}`);
    noteFragment.innerText = this._content;

    const { year, month, day, hours, minutes } = Note.parseUnixTime(this._date);
    date.innerText = `${day}.${month}.${year} ⚫ ${hours}:${minutes}`;

    elem.appendChild(title);
    elem.appendChild(date);
    elem.appendChild(noteFragment);
    Note.parseUnixTime(this._date);
    return elem;
  };
}
