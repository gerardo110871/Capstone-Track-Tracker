
console.log('Got Connection')

const getAllBtn = document.querySelector('#all')
const createForm = document.querySelector('#create-form')
const newBikeInput = document.querySelector('#bike')
const newTrackInput = document.querySelector('#track')
const newWeatherDropDown = document.querySelector('select')
const newLapsInput = document.querySelector('#laps')
const newLapTime = document.querySelector('#lap-time')
const newLikesText = document.querySelector('textarea')
const logsContainer = document.querySelector('section')

const baseURL = `http://localhost:5555`


function createLogCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.bikeName} </h3>
  <p><b>Track Name:</b> ${char.trackName}</p>
  <p><b>Weather:</b> ${char.weather} | <b>Laps:</b> ${char.laps}</p>
  <b>Best Lap Time:</b> ${char.lapTime}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

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




getAllBtn.addEventListener('click', getAllLogs)
createForm.addEventListener('submit', createNewLog)

// getAllLogs()