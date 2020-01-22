import { Note } from './Note.js';

export class Excerpt {
  constructor(note) {
    this._title = note ? note.title : '';
    this._content = note ? note.content : '';
    this._date = note ? note.date : '';
    this._colorLabel = note ? note.colorLabel : '';
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

  set colorLabel(newValue) {
    this._colorLabel = newValue;
  }

  createExcerptElement = id => {
    const elem = document.createElement('div');
    elem.id = `excerpt-${id}`;
    elem.classList.add('excerpt');

    const title = document.createElement('p');
    title.classList.add(`excerpt__title-${id}`);
    title.innerText = this._title;

    const date = document.createElement('p');
    date.classList.add(`excerpt__date-${id}`);

    const noteFragment = document.createElement('p');
    noteFragment.classList.add(`excerpt__noteFragment-${id}`);
    noteFragment.innerText = this._content;

    if (this._colorLabel) {
      elem.style.borderRight = `1rem solid ${this._colorLabel}`;
    }

    const { year, month, day, hours, minutes } = Note.parseUnixTime(this._date);
    date.innerText = `${day}.${month}.${year} ⚫ ${hours}:${minutes}`;

    [title, date, noteFragment].forEach(item => {
      elem.appendChild(item);
    });
    Note.parseUnixTime(this._date);
    return elem;
  };
}
