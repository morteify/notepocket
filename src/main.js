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
      if (value.date === propsToShow.date) {
        target[propsToShow.date] = value;
        excerptsObj[propsToShow.date] = value;
        console.log('excerptsObj', excerptsObj);
        try {
          const excerptTitle = document.querySelector(
            `.excerpt__title-${propsToShow.date}`,
          );
          excerptTitle.innerText = target[propsToShow.date].title;
          const excerptNoteFragment = document.querySelector(
            `.excerpt__noteFragment-${propsToShow.date}`,
          );
          excerptNoteFragment.innerText = target[propsToShow.date].content;
        } catch (error) {
          console.error;
        }
      }
    }
    return true;
  },
});

const addNoteButton = document.querySelector('#save-note');
addNoteButton.addEventListener('click', () => {
  propsToShow.date = Date.now();
  currentNote = new Note(savedNotesProxy, propsToShow);
  savedNotes[propsToShow.date] = currentNote;
  addExcerpt(currentNote);
});

const propsToShowProxy = new Proxy(propsToShow, {
  set: (target, key, value) => {
    currentNote = value;
    return true;
  },
});

function addExcerpt(note) {
  const excerpt = new Excerpt(note);
  excerptsObj[propsToShow.date] = excerpt;
  const excerptElem = excerpt.createExcerptElement(note.date);
  excerptElem.addEventListener('click', event => {
    const [title, content, date] = event.currentTarget.children;
    propsToShowProxy.title = title.innerText;
    propsToShowProxy.content = content.innerText;
    propsToShowProxy.date = date.innerText;
  });
  noteExcerpt.appendChild(excerptElem);
}
