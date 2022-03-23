const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let logs = [
    {
        id: 0,
        bikeName: 'Yamaha R1', 
        trackName: 'Apex Racetrack', 
        weather: 'Sunny',
        laps: 39, 
        likes: ['Great traction', 'Well Maintained', 'Good service']
    },
]

app.get('/logs', (req, res) => {
    console.log('hit get logs')
    res.status(200).send(logs)
})

let id = 1

app.post('/logs', (req, res) => {
    let newLog = {...req.body, id}
    newLog.likes = newLog.likes.slice(0, 3)
    logs.unshift(newLog)
    res.status(200).send(logs)
    id++
})

app.listen(5555, () => console.log('up on 5555'))