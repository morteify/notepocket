import { Note } from './components/Note.js';
import { Excerpt } from './components/Excerpt.js';

const noteExcerpt = document.querySelector('#note-excerpt');
const noteContent = document.querySelector('#note-content');
let savedNotes = [];

const savedNotesProxy = new Proxy(savedNotes, {
  set: (target, key, value) => {
    if (typeof value !== 'number') {
      if (!savedNotes.map(item => item.title).includes(value.title)) {
        target[key] = value;
        addExcerpt(value);
      }
    }
    return true;
  },
});

function addExcerpt(note) {
  const excerpt = new Excerpt(note);
  const excerptElem = excerpt.createExcerptElement();
  noteExcerpt.appendChild(excerptElem);
}

const noteView = new Note(savedNotesProxy);
