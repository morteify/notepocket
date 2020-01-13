export class Note {
  constructor(state, initialValues) {
    this.form = {};
    this.title = initialValues ? initialValues.title : '';
    this.content = initialValues ? initialValues.content : '';
    this.date = null;
    this.tags = [];
    this.state = state;
  }

  addTitle = () => {
    const text = document.querySelector('#noteTitleTextarea');
    text.addEventListener('change', () => {
      this.title = text.value;
    });
  };

  addContent = () => {
    const text = document.querySelector('#noteContentTextarea');
    text.addEventListener('change', () => {
      this.content = text.value;
    });
  };

  addDate = () => {
    this.date = Date.now();
  };

  saveNote = () => {
    const saveButton = document.querySelector('#save-note');
    saveButton.addEventListener('click', () => {
      this.addDate();
      this.state.push({
        title: this.title,
        content: this.content,
        date: this.date,
      });
    });
  };

  render = () => {
    this.addContent();
    this.addTitle();
    this.saveNote();
  };
}
