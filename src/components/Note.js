export class Note {
  constructor(state, initialValues) {
    this.title = initialValues ? initialValues.title : '';
    this.content = initialValues ? initialValues.content : '';
    this.date = initialValues ? initialValues.date : '';
    this.tags = [];
    this.state = state;
    this.addContent();
    this.addTitle();
    this.saveNote();
  }

  addTitle = () => {
    const text = document.querySelector('#note-title-textarea');
    if (this.title) text.value = this.title;
    text.addEventListener('change', () => {
      this.title = text.value;
      this.saveNote();
    });
  };

  addContent = () => {
    const text = document.querySelector('#note-content-textarea');
    if (this.content) text.value = this.content;
    text.addEventListener('change', () => {
      this.content = text.value;
      this.saveNote();
    });
  };

  addDate = () => {
    this.date = Date.now();
  };

  saveNote = () => {
    // const saveButton = document.querySelector('#save-note');
    // saveButton.addEventListener('click', () => {
    // this.addDate();
    this.state[this.date] = {
      title: this.title,
      content: this.content,
      date: this.date,
    };
    // this.state.push({
    //   [key]: val,
    // });
    // });
  };
}
