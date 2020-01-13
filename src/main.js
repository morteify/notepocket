import { Note } from './components/Note.js';

const noteExcerpt = document.querySelector('#noteExcerpt');
const noteContent = document.querySelector('#noteContent');
let savedNotes = [];

const savedNotesProxy = new Proxy(savedNotes, {
  set: (target, key, value) => {
    target[key] = value;
    console.log('state', savedNotes);
    if (typeof value !== 'number') updateExcerpt(value);
    return true;
  },
});

function updateExcerpt(note) {
  const node = document.createElement('p');
  node.innerText += note.title;
  node.innerText += note.date;
  noteExcerpt.appendChild(node);
}

const noteView = new Note(savedNotesProxy);
noteView.render();
