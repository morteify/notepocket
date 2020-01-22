export class Note {
  constructor(state, propsToShowRef = null, contentCtx, titleCtx) {
    this.propsToShowRef = propsToShowRef;
    this.title = '';
    this.content = '';
    this.date = '';
    this.colorLabel = '';
    this.state = state;
    this.addContent(contentCtx);
    this.addTitle(titleCtx);
  }

  static parseUnixTime(dateToParse) {
    if (typeof dateToParse === 'number') {
      const getParsedDate = (unixTime, callback) => {
        const dateFromUnixTime = new Date(unixTime);
        const parsed = callback(dateFromUnixTime);
        return parsed.toString().padStart(2, 0);
      };
      const year = getParsedDate(dateToParse, date => date.getFullYear());
      const month = getParsedDate(dateToParse, date => date.getMonth() + 1);
      const day = getParsedDate(dateToParse, date => date.getDate());
      const hours = getParsedDate(dateToParse, date => date.getHours());
      const minutes = getParsedDate(dateToParse, date => date.getMinutes());
      return { year, month, day, hours, minutes };
    }
  }

  addTitle = ctx => {
    const text = ctx;
    text.addEventListener('input', () => {
      this.title = text.value;
      if (this.propsToShowRef) {
        this.propsToShowRef.title = this.title;
      }
      this.saveNote();
    });
  };

  addContent = ctx => {
    const text = ctx;
    text.addEventListener('input', () => {
      this.content = text.value;
      if (this.propsToShowRef) {
        this.propsToShowRef.content = this.content;
      }
      this.saveNote();
    });
  };

  addDate = () => {
    this.date = Date.now();
  };

  saveNote = () => {
    this.state[this.date] = {
      title: this.propsToShowRef.title,
      content: this.propsToShowRef.content,
      date: this.date,
    };
  };
}
