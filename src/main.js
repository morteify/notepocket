import { Note } from './Note.js';
import { Excerpt } from './Excerpt.js';

window.onload = () => {
  const localStorage = window.localStorage;
  const savedNotes = JSON.parse(localStorage.getItem('savedNotes'));
  console.log('local', savedNotes);
  if (savedNotes && Object.values(savedNotes).length) {
    Object.values(savedNotes).forEach(item => {
      console.log(item);
      propsToShow.title = item.title;
      propsToShow.content = item.content;
      addNewNote(propsToShow, savedNotesProxy, item.date);
    });
  }
};

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
      console.log('savedNotes', savedNotes);
      console.log('excerptsObj', excerptsObj);
      const localStorage = window.localStorage;
      let savedNotesLocalStorage = JSON.parse(
        localStorage.getItem('savedNotes'),
      );

      if (savedNotesLocalStorage === null) {
        savedNotesLocalStorage = {};
      }
      console.log("ojej', ", savedNotesLocalStorage);
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
  savedNotes[propsToShow.date] = {
    title: currentNote.title,
    content: currentNote.content,
    date: currentNote.date,
  };
  addExcerpt(currentNote);
  return currentNote;
}

function addExcerpt(note) {
  console.log('note', note);
  const excerpt = new Excerpt(note.propsToShowRef);
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
    console.log('clicked', propsToShow.date);
  });
  noteExcerpt.appendChild(excerptElem);
}
