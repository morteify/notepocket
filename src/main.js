import { Note } from './components/Note.js';
import { Excerpt } from './components/Excerpt.js';

const noteExcerpt = document.querySelector('#note-excerpt');
const noteContent = document.querySelector('#note-content');

const noteTitleTextarea = document.querySelector('#note-title-textarea');
const noteContentTextarea = document.querySelector('#note-content-textarea');

noteTitleTextarea.value = null;
noteContentTextarea.value = null;

let savedNotes = [];
let excerpts = [];
let noteView = null;
let currentExcerptSelected = 0;
let propsToShow = {
  title: '',
  content: '',
  date: null,
};

const savedNotesProxy = new Proxy(savedNotes, {
  set: (target, key, value) => {
    if (value !== undefined && typeof value !== 'number') {
      propsToShowProxy.title = value.title;
      propsToShowProxy.content = value.content;
      console.log('propsToShow', propsToShow);
      console.log('savedNotes', savedNotes);
      console.log('key', key);
      if (excerpts.length) {
        console.log('current', excerpts, currentExcerptSelected);
        excerpts[currentExcerptSelected].title = propsToShow.title;
      }
      //   if (!savedNotes.map(item => item.title).includes(value.title)) {
      //     target[key] = value;
      //     // addExcerpt(value);
      //     console.log('targetidx', savedNotes);
      //   } else {
      //     const targetIndex = target.map((item, index) => {
      //       if (item.title === value.title) {
      //         return index;
      //       }
      //     });

      //     target[targetIndex].title = value.title;
      //     target[targetIndex].content = value.content;
      //     target[targetIndex].date = value.date;
      //     console.log('targetidx', savedNotes);
      //   }
    }
    return true;
  },
});

const saveButton = document.querySelector('#save-note');
saveButton.addEventListener('click', () => {
  // propsToShow.title = '';
  // propsToShow.content = '';
  propsToShow.date = Date.now();
  noteView = new Note(savedNotesProxy, propsToShow);
  addExcerpt(propsToShow);
  savedNotes.push(propsToShow);
});

const propsToShowProxy = new Proxy(propsToShow, {
  set: (target, key, value) => {
    target[key] = value;
    return true;
  },
});

function addExcerpt(note) {
  const excerpt = new Excerpt(note);
  excerpts.push(excerpt);
  excerpts.forEach((item, index) => {
    if (JSON.stringify(excerpt) === JSON.stringify(item)) {
      currentExcerptSelected = index;
    }
  });
  console.log('excerpts', excerpts);
  const excerptElem = excerpt.createExcerptElement();
  excerptElem.addEventListener('click', () => {
    propsToShowProxy.title = excerpt.title;
    propsToShowProxy.content = excerpt.content;
    propsToShowProxy.date = excerpt.date;
    excerpts.forEach((item, index) => {
      if (JSON.stringify(excerpt) === JSON.stringify(item)) {
        currentExcerptSelected = index;
      }
    });
    // noteView = new Note(savedNotesProxy, propsToShow);
  });
  noteExcerpt.appendChild(excerptElem);
}
