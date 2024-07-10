const notesContainer = document.getElementById('notes-container')
const noteInput = document.getElementById('noteInput');
const submitInput = document.getElementById('submitInput');
const errorText = document.getElementById('errorText');

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

const getParsedStorageData = () => {
    const storageData = localStorage.getItem('LOCALE_DATA');
    return JSON.parse(storageData);
}

const removeNote = (elementToRemove, element) => {
    const data = getParsedStorageData()
    const removeDataFilter = data.filter(element => element !== elementToRemove);
    element.remove();
    localStorage.setItem('LOCALE_DATA', JSON.stringify(removeDataFilter));
}

const submitNote = (noteInput) => {
    const data = getParsedStorageData()
    data.push(noteInput);
    localStorage.setItem('LOCALE_DATA', JSON.stringify(data));
    loadNotes()
  };


const loadNotes = () => {
    const data = getParsedStorageData()
    notesContainer.innerHTML= ''
    if(data.length !== 0) {
    data.forEach((note) => {
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

function handleOnLoad() {
    const INITIAL_DATA = [
        'Mi primera nota',
        'Esta es una nota larga que ocupa más de una línea',
        'Otra nota de ejemplo',
        'Última nota de ejemplo'
    ]
    
    const STORE_DATA = localStorage.getItem('LOCALE_DATA');
    if(STORE_DATA === null) {
        localStorage.setItem('LOCALE_DATA', JSON.stringify(INITIAL_DATA));
    }
    loadNotes()
}

window.onload = handleOnLoad()