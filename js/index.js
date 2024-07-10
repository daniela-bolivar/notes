const INITIAL_DATA = [
    'Mi primera nota',
    'Esta es una nota larga que ocupa más de una línea',
    'Otra nota de ejemplo',
    'Última nota de ejemplo'
]

const STORE_DATA = localStorage.getItem('newData');
const LOCALE_DATA = JSON.parse(STORE_DATA);

const notesContainer = document.getElementById('notes-container')
const noteInput = document.getElementById('noteInput');
const submitInput = document.getElementById('submitInput');
const errorText = document.getElementById('errorText');
let newData = [...INITIAL_DATA]
localStorage.setItem('newData', JSON.stringify(newData));

submitInput.addEventListener('click', () => {
    if(noteInput.value !== '') {
        errorText.textContent = ''
        const newNote = noteInput.value;
        console.log(newNote)
        submitNote(newNote);
        noteInput.value = '';
    } else {
        errorText.textContent = 'Debes escribir una nota antes';
    }
  });

const removeNote = (elementToRemove, element) => {
    newData = newData.filter(element => element !== elementToRemove);
    element.remove();
    localStorage.setItem('newData', JSON.stringify(newData));
}

const submitNote = (noteInput) => {
    newData.push(noteInput);
    localStorage.setItem('newData', JSON.stringify(newData));
    loadNotes([noteInput])
    console.log(newData);
  };


const loadNotes = (notes) => {
    if(notes.length !== 0) {
    notes.forEach((note) => {
            const newCard = document.createElement('div')
            const deleteButton = document.createElement('button')
            const noteText = document.createElement('p')
            noteText.textContent = note
            deleteButton.textContent = 'Borrar'
            deleteButton.addEventListener('click', () => removeNote(note, newCard))
            newCard.appendChild(noteText)
            newCard.appendChild(deleteButton)
            notesContainer.appendChild(newCard)
        })
    } else {
        const emptyText = document.createElement('p')
        emptyText.textContent = 'No hay notas creadas'
        notesContainer.appendChild(emptyText)
    }
}

window.onload = loadNotes(LOCALE_DATA)