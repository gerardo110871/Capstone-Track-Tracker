console.log('Got Connection')

const getAllBtn = document.querySelector('#all')
const createForm = document.querySelector('#create-form')
const newBikeInput = document.querySelector('#bike')
const newTrackInput = document.querySelector('#track')
const newWeatherDropDown = document.querySelector('select')
const newLapsInput = document.querySelector('#laps')
const newLapTime = document.querySelector('#lap-time')
const logsContainer = document.querySelector('section')
let imageURL = document.querySelector('#img')

const baseURL = `http://localhost:5555`

function createLogCard(log) {
  let logCard = document.createElement('div')
  logCard.classList.add('log-card')
  logCard.innerHTML = `<div class="new-log"> <img alt='track Picture' src=${log.imageURL} class="track-picture"/>
   <b><p class="new-log">${log.bikeName}</p></b>
  <p class="new-log"><b>Track Name:</b> ${log.trackName}</p>
  <p class="new-log"><b>Weather:</b> ${log.weather} | <b>Laps:</b> ${log.laps}</p>
  <p class="new-log"><b>Best Lap Time:</b> ${log.lapTime}</p>
  <h4 class="new-log">Likes</h4>
  <button onclick="deleteLog(${log.id})">delete</button>
  </div>`
  logsContainer.appendChild(logCard)
}
function clearLogs() {
  logsContainer.innerHTML = ``
}
//this will get all the logs in the server file
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

  let body = {
    imageURL: imageURL.value,
    bikeName: newBikeInput.value,
    trackName: newTrackInput.value,
    weather: newWeatherDropDown.value,
    laps: newLapsInput.value,
    lapTime: newLapTime.value,
  }

  axios.post(`${baseURL}/logs`, body)
   .then (function (res) {
     for (let i = 0; i < res.data.length; i++) {
       createLogCard(res.data[i])
     }
   })

   imageURL.value = ''
   newBikeInput.value = ''
   newTrackInput.value = ''
   newWeatherDropDown.value = 'Sunny'
   newLapsInput.value = ''
   newLapTime.value = ''
}

function displayLogs(arr) {
  logsContainer.innerHTML = ``
  for (let i = 0; i < arr.length; i++) {
      createLogCard(arr[i])
  }
}

function logsCallback({data:logs}) {
  displayLogs(logs)
}

function deleteLog(id) {
  axios.delete(`${baseURL}/logs/${id}`)
  .then(logsCallback)
}


getAllBtn.addEventListener('click', getAllLogs)
createForm.addEventListener('submit', createNewLog)
// document.addEventListener("mousemove", onMouseMove)
// getAllLogs()