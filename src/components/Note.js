export class Note {
  constructor(state, propsToShowRef = null) {
    this.propsToShowRef = propsToShowRef;
    this.title = '';
    this.content = '';
    this.date = '';
    this.tags = [];
    this.state = state;
    this.addContent();
    this.addTitle();
  }

  addTitle = () => {
    const text = document.querySelector('#note-title-textarea');
    text.addEventListener('input', () => {
      this.title = text.value;
      if (this.propsToShowRef) {
        this.propsToShowRef.title = this.title;
      }
      this.saveNote();
    });
  };

  addContent = () => {
    const text = document.querySelector('#note-content-textarea');
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
