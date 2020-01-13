import { Note } from './components/Note.js';
import { Excerpt } from './components/Excerpt.js';

const noteExcerpt = document.querySelector('#note-excerpt');
const noteContent = document.querySelector('#note-content');
let savedNotes = [];

const savedNotesProxy = new Proxy(savedNotes, {
  set: (target, key, value) => {
    target[key] = value;
    console.log('state', savedNotes);
    if (typeof value !== 'number') addExcerpt(value);

    return true;
  },
});

function addExcerpt(note) {
  const excerpt = new Excerpt(note);
  noteExcerpt.appendChild(excerpt.createExcerptElement());
}

const noteView = new Note(savedNotesProxy);
