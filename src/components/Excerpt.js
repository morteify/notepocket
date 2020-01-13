export class Excerpt {
  constructor(note) {
    this.title = note ? note.title : '';
    this.content = note ? note.content : '';
    this.date = note ? note.date : '';
    this.tags = [];
    this.createExcerptElement();
  }

  createExcerptElement = () => {
    const elem = document.createElement('div');
    elem.classList.add('excerpt');
    const title = document.createElement('p');
    title.classList.add('excerpt__title');
    title.innerText = this.title;
    const date = document.createElement('p');
    date.classList.add('excerpt__date');
    date.innerText = this.date;

    elem.appendChild(title);
    elem.appendChild(date);
    return elem;
  };
}
