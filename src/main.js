import { Note } from './Note.js';
import { Excerpt } from './Excerpt.js';

let savedNotes = {};

window.onload = () => {
  const localStorage = window.localStorage;
  const localStorageSavedNotes = JSON.parse(localStorage.getItem('savedNotes'));
  if (localStorageSavedNotes && Object.values(localStorageSavedNotes).length) {
    Object.entries(localStorageSavedNotes).forEach(([key, value]) => {
      propsToShow.title = value.title;
      propsToShow.content = value.content;
      propsToShow.date = key;
      addNewNote(propsToShow, savedNotesProxy, parseInt(key));
    });
  }
};

const noteExcerpt = document.querySelector('#note-excerpt');
const noteContent = document.querySelector('#note-content');

const noteTitleTextarea = document.querySelector('#note-title-textarea');
const noteContentTextarea = document.querySelector('#note-content-textarea');

noteTitleTextarea.value = null;
noteContentTextarea.value = null;

let propsToShow = {
  title: '',
  content: '',
  date: null,
};

const savedNotesProxy = new Proxy(savedNotes, {
  set: (target, key, value) => {
    if (typeof value !== 'number') {
      const localStorage = window.localStorage;
      let savedNotesLocalStorage = JSON.parse(
        localStorage.getItem('savedNotes'),
      );

      if (savedNotesLocalStorage === null) {
        savedNotesLocalStorage = {};
      }

      savedNotesLocalStorage[propsToShow.date] = value;
      localStorage.setItem(
        'savedNotes',
        JSON.stringify(savedNotesLocalStorage),
      );

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
  addNewNote(propsToShow, savedNotesProxy, Date.now());
});

function addNewNote(props, proxy, date) {
  const currentDate = date;
  props.date = currentDate;
  const currentNote = new Note(
    proxy,
    props,
    document.querySelector('#note-content-textarea'),
    document.querySelector('#note-title-textarea'),
  );
  currentNote.date = currentDate;

  addExcerpt(currentNote);
  return currentNote;
}

function addExcerpt(note) {
  const excerpt = new Excerpt(note.propsToShowRef);
  const excerptElem = excerpt.createExcerptElement(propsToShow.date);

  excerptElem.addEventListener('click', event => {
    const [title, _, content] = event.currentTarget.children;
    const date = event.currentTarget.id;
    noteTitleTextarea.value = title.innerText;
    noteContentTextarea.value = content.innerText;
    propsToShow.title = title.innerText;
    propsToShow.content = content.innerText;
    propsToShow.date = parseInt(date.replace('excerpt-', ''));
  });
  noteExcerpt.appendChild(excerptElem);
}

const trashBin = document.querySelector('#trash');
trashBin.addEventListener('click', event => {
  removeNote(propsToShow.date);
});

function removeNote(noteId) {
  let savedNotesLocalStorage = JSON.parse(localStorage.getItem('savedNotes'));

  if (savedNotesLocalStorage === null) {
    savedNotesLocalStorage = {};
  } else {
    delete savedNotesLocalStorage[noteId];
  }

  localStorage.setItem('savedNotes', JSON.stringify(savedNotesLocalStorage));
  const elemToRemove = document.querySelector(`#excerpt-${noteId}`);
  elemToRemove.remove();
}
