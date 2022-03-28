// const { default: axios } = require("axios");

const message = document.querySelector('#message')
let form = document.querySelector('form')
form.addEventListener('submit', addTrack)


function addTrack(event) {
    event.preventDefault();
    const inputField = document.querySelector('input')

    const track = document.createElement('li')

    const trackName = document.createElement('span')
    trackName.textContent = inputField.value
    trackName.addEventListener('click', crossOffMovie)
    track.appendChild(trackName)

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'DELETE'
    deleteBtn.addEventListener('click', deleteMovie)
    track.appendChild(deleteBtn)

    const list = document.querySelector('.track-list')
    list.appendChild(track)

    inputField.value = ''
}

function deleteMovie(event) {
    event.preventDefault();
    event.target.parentNode.remove()
    message.textContent = 'Item Deleted'
    revealMessage()
}

function crossOffMovie(event) {
    event.target.classList.toggle("checked")
    if (event.target.classList.contains('checked')){
            message.textContent = `Well Done`
    } else {
        message.textContent = `Added Back`
    }
    revealMessage()
}

function revealMessage(){
    setTimeout(hide, 1000)
}