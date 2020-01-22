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
      propsToShow.colorLabel = value.colorLabel;
      propsToShow.date = key;
      addNewNote(propsToShow, savedNotesProxy, parseInt(key));
    });
  }
};

const noteExcerpt = document.querySelector('#note-excerpt');
const noteContent = document.querySelector('#note-content');

const noteTitleTextarea = document.querySelector('#note-title-textarea');
const noteContentTextarea = document.querySelector('#note-content-textarea');
const dateContentTextArea = document.querySelector(
  '#note-content__header__date',
);

noteTitleTextarea.value = null;
noteContentTextarea.value = null;

let propsToShow = {
  title: '',
  content: '',
  date: null,
  colorLabel: null,
};

let currentlySelectedExcerpt = null;

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

      savedNotesLocalStorage[propsToShow.date] = {
        title: value.title,
        content: value.content,
        date: value.date,
        colorLabel: propsToShow.colorLabel,
      };

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
  propsToShow.colorLabel = null;
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
    const ribbonColor = event.currentTarget.style['border-right-color'];
    if (currentlySelectedExcerpt !== null) {
      try {
        const prevElem = document.querySelector(`#${currentlySelectedExcerpt}`);
        prevElem.style.background = '#f7f7f7';
      } catch (error) {
        console.error;
      }
    }

    currentlySelectedExcerpt = date;
    event.currentTarget.style.background = 'rgb(201, 201, 201)';

    const { year, month, day, hours, minutes } = Note.parseUnixTime(
      parseInt(date.replace('excerpt-', '')),
    );
    dateContentTextArea.innerText = `${day}.${month}.${year} ⚫ ${hours}:${minutes}`;

    noteTitleTextarea.value = title.innerText;
    noteContentTextarea.value = content.innerText;
    propsToShow.colorLabel = ribbonColor;
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

const paintBrush = document.querySelector('#paintBrush');
paintBrush.addEventListener('click', event => {
  addExcerptRibbon();
});
function addExcerptRibbon() {
  const colorPickerInput = document.querySelector('input[type=color]');
  colorPickerInput.click();
  colorPickerInput.addEventListener('input', event => {
    propsToShow.colorLabel = colorPickerInput.value;
    let savedNotesLocalStorage = JSON.parse(localStorage.getItem('savedNotes'));

    if (savedNotesLocalStorage === null) {
      savedNotesLocalStorage = {};
    }
    savedNotesLocalStorage[propsToShow.date]['colorLabel'] =
      colorPickerInput.value;

    const excerpt = document.querySelector(`#excerpt-${propsToShow.date}`);
    excerpt.style.borderRight = `1rem solid ${colorPickerInput.value}`;

    localStorage.setItem('savedNotes', JSON.stringify(savedNotesLocalStorage));
  });
}
