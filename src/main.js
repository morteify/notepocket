import { Note } from './components/Note.js';
import { Excerpt } from './components/Excerpt.js';

const noteExcerpt = document.querySelector('#note-excerpt');
const noteContent = document.querySelector('#note-content');

const noteTitleTextarea = document.querySelector('#note-title-textarea');
const noteContentTextarea = document.querySelector('#note-content-textarea');

noteTitleTextarea.value = null;
noteContentTextarea.value = null;

let savedNotes = {};
let excerptsObj = {};
let currentNote = null;
let propsToShow = {
  title: '',
  content: '',
  date: null,
};

const savedNotesProxy = new Proxy(savedNotes, {
  set: (target, key, value) => {
    if (typeof value !== 'number') {
      excerptsObj[propsToShow.date] = value;
      target[propsToShow.date] = value;
      console.log(savedNotes);

      const excerptTitle = document.querySelector(
        `.excerpt__title-${propsToShow.date}`,
      );
      if (excerptTitle) {
        excerptTitle.innerText = value.title;
      }

      const excerptNoteFragment = document.querySelector(
        `.excerpt__noteFragment-${propsToShow.date}`,
      );

      if (excerptNoteFragment) {
        excerptNoteFragment.innerText = propsToShow.content;
      }
    }
    return true;
  },
});

const addNoteButton = document.querySelector('#save-note');
addNoteButton.addEventListener('click', () => {
  propsToShow.title = '';
  propsToShow.content = '';
  const currentDate = Date.now();
  propsToShow.date = currentDate;
  const currentNote = new Note(savedNotesProxy, propsToShow);
  currentNote.date = currentDate;
  savedNotes[propsToShow.date] = currentNote;
  addExcerpt(currentNote);
});

function addExcerpt(note) {
  const excerpt = new Excerpt(note);
  excerptsObj[propsToShow.date] = excerpt;
  const excerptElem = excerpt.createExcerptElement(propsToShow.date);

  excerptElem.addEventListener('click', event => {
    const [title, _, content] = event.currentTarget.children;
    const date = event.currentTarget.id;
    noteTitleTextarea.value = title.innerText;
    noteContentTextarea.value = content.innerText;
    propsToShow.title = title.innerText;
    propsToShow.content = content.innerText;
    propsToShow.date = parseInt(date);
  });
  noteExcerpt.appendChild(excerptElem);
}
