export class Excerpt {
  constructor(note) {
    this.title = note ? note.title : '';
    this.content = note ? note.content : '';
    this.date = note ? note.date : '';
    this.tags = [];
    this.createExcerptElement();
  }

  parseUnixTime = () => {
    if (this.date) {
      const getParsedDate = (unixTime, callback) => {
        const dateFromUnixTime = new Date(unixTime);
        const parsed = callback(dateFromUnixTime);
        return parsed.toString().padStart(2, 0);
      };
      const year = getParsedDate(this.date, date => date.getFullYear());
      const month = getParsedDate(this.date, date => date.getMonth() + 1);
      const day = getParsedDate(this.date, date => date.getDate());
      const hours = getParsedDate(this.date, date => date.getHours());
      const minutes = getParsedDate(this.date, date => date.getMinutes());
      return { year, month, day, hours, minutes };
    }
  };

  createExcerptElement = () => {
    const elem = document.createElement('div');
    elem.classList.add('excerpt');
    const title = document.createElement('p');
    title.classList.add('excerpt__title');
    title.innerText = this.title;
    const date = document.createElement('p');
    date.classList.add('excerpt__date');

    const { year, month, day, hours, minutes } = this.parseUnixTime();
    date.innerText = `${day}-${month}-${year} ${hours}:${minutes}`;

    elem.appendChild(title);
    elem.appendChild(date);
    this.parseUnixTime();
    return elem;
  };
}
