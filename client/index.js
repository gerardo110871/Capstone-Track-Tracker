
console.log('Got Connection')

const gradient = document.querySelector(".gradient");
const getAllBtn = document.querySelector('#all')
const createForm = document.querySelector('#create-form')
const newBikeInput = document.querySelector('#bike')
const newTrackInput = document.querySelector('#track')
const newWeatherDropDown = document.querySelector('select')
const newLapsInput = document.querySelector('#laps')
const newLapTime = document.querySelector('#lap-time')
const newLikesText = document.querySelector('textarea')
const logsContainer = document.querySelector('section')
const deleteBtn = document.querySelector('#delete')

const baseURL = `http://localhost:5555`

function onMouseMove(event) {
  gradient.style.backgroundImage = 'radial-gradient(at ' + event.clientX + 'px ' + event.clientY + 'px, rgba(0, 2, 128, 0.9) 0, #424242 90%)';
}

function createLogCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<div class="new-log"> <b><p class="new-log">${char.bikeName}</p></b>
  <p class="new-log"><b>Track Name:</b> ${char.trackName}</p>
  <p class="new-log"><b>Weather:</b> ${char.weather} | <b>Laps:</b> ${char.laps}</p>
  <p class="new-log"><b>Best Lap Time:</b> ${char.lapTime}</p>
  <h4 class="new-log">Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>
  <button id="delete">Delete</button>
  </div>`

  logsContainer.appendChild(charCard)
}

function clearLogs() {
  logsContainer.innerHTML = ``
}
//this will get all the logs in the server database
function getAllLogs() {
  clearLogs()

  axios.get(`${baseURL}/logs`)
    .then(function (res) {
      for (let i = 0; i < res.data.length; i++) {
        createLogCard(res.data[i])
      }
    })
    .catch(function (err) {
      console.log('having trouble getting all')
    })
}

function createNewLog(event) {
  event.preventDefault()

  clearLogs()

  let newLikes = [...newLikesText.value.split(',')]

  let body = {
    bikeName: newBikeInput.value,
    trackName: newTrackInput.value,
    weather: newWeatherDropDown.value,
    laps: newLapsInput.value,
    lapTime: newLapTime.value,
    likes: newLikes
  }

  axios.post(`${baseURL}/logs`, body)
   .then (function (res) {
     for (let i = 0; i < res.data.length; i++) {
       createLogCard(res.data[i])
     }
   })

   newBikeInput.value = ''
   newTrackInput.value = ''
   newWeatherDropDown.value = 'Sunny'
   newLapsInput.value = ''
   newLapTime.value = ''
   newLikesText.value = ''
}

function deleteEntry(event) {
  event.preventDefault();
  event.target.parentNode.remove()
  message.textContent = 'Log Deleted Successfully'
  revealMessage()
}


getAllBtn.addEventListener('click', getAllLogs)
createForm.addEventListener('submit', createNewLog)
document.addEventListener("mousemove", onMouseMove)
deleteBtn.addEventListener('click', deleteEntry)
getAllLogs()



function revealMessage(){
  setTimeout(hide,1000)

}