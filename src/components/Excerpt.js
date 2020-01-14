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
    const excerptTitle = document.querySelector('.excerpt__title' + this._date);
    console.log('title', this._title);
    excerptTitle.innerHTML = this._title;
  }

  set content(newValue) {
    this._content = newValue;
  }

  set date(newValue) {
    this._date = newValue;
  }

  parseUnixTime = () => {
    if (this._date) {
      const getParsedDate = (unixTime, callback) => {
        const dateFromUnixTime = new Date(unixTime);
        const parsed = callback(dateFromUnixTime);
        return parsed.toString().padStart(2, 0);
      };
      const year = getParsedDate(this._date, date => date.getFullYear());
      const month = getParsedDate(this._date, date => date.getMonth() + 1);
      const day = getParsedDate(this._date, date => date.getDate());
      const hours = getParsedDate(this._date, date => date.getHours());
      const minutes = getParsedDate(this._date, date => date.getMinutes());
      return { year, month, day, hours, minutes };
    }
  };

  createExcerptElement = id => {
    const elem = document.createElement('div');
    elem.classList.add('excerpt');
    const title = document.createElement('p');
    title.classList.add(`excerpt__title-${id}`);
    title.innerText = this._title;
    const date = document.createElement('p');
    date.classList.add(`excerpt__date-${id}`);
    const noteFragment = document.createElement('p');
    noteFragment.classList.add(`excerpt__noteFragment-${id}`);
    noteFragment.innerText = this._content;

    const { year, month, day, hours, minutes } = this.parseUnixTime();
    date.innerText = `${day}.${month}.${year} ⚫ ${hours}:${minutes}`;

    elem.appendChild(title);
    elem.appendChild(date);
    elem.appendChild(noteFragment);
    this.parseUnixTime();
    return elem;
  };
}
