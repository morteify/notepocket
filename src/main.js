import { Note } from './components/Note.js';
import { Excerpt } from './components/Excerpt.js';

const noteExcerpt = document.querySelector('#note-excerpt');
const noteContent = document.querySelector('#note-content');

let savedNotes = [];
let propsToShow = {
  title: '',
  content: '',
  date: null,
};

const savedNotesProxy = new Proxy(savedNotes, {
  set: (target, key, value) => {
    if (typeof value !== 'number') {
      if (!savedNotes.map(item => item.title).includes(value.title)) {
        target[key] = value;
        addExcerpt(value);
      } else {
        target[key] = value;
      }
    }
    return true;
  },
});

let noteView = new Note(savedNotesProxy);

const propsToShowProxy = new Proxy(propsToShow, {
  set: (target, key, value) => {
    target[key] = value;
    console.log('props', propsToShow);
    return true;
  },
});

function addExcerpt(note) {
  const excerpt = new Excerpt(note);
  const excerptElem = excerpt.createExcerptElement();
  excerptElem.addEventListener('click', () => {
    console.log(excerpt);
    propsToShowProxy.title = excerpt.title;
    propsToShowProxy.content = excerpt.content;
    propsToShowProxy.date = excerpt.date;
    noteView = new Note(savedNotesProxy, propsToShow);
  });
  noteExcerpt.appendChild(excerptElem);
}
