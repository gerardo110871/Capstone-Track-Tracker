const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let logs = [
    {
        id: 0,
        imageURL: 'https://media.istockphoto.com/photos/outdoor-track-and-racing-picture-id942673134?k=20&m=942673134&s=612x612&w=0&h=egK1oNwQYa_SOwjrY0KTv-iVHvX5DuljQJN1ZYC1MiM=',
        bikeName: 'Yamaha R1', 
        trackName: 'Apex Racetrack', 
        weather: 'Sunny',
        laps: 39,
        lapTime: 19.96,
        likes: ['Great traction', 'Well Maintained', 'Good service']
    },
    {
        id: 1,
        imageURL: 'https://media.istockphoto.com/photos/outdoor-track-and-racing-picture-id942673134?k=20&m=942673134&s=612x612&w=0&h=egK1oNwQYa_SOwjrY0KTv-iVHvX5DuljQJN1ZYC1MiM=',
        bikeName: 'Yamaha R1', 
        trackName: 'Apex Racetrack', 
        weather: 'Sunny',
        laps: 39,
        lapTime: 19.96,
        likes: ['Great traction', 'Well Maintained', 'Good service']
    }
]

// let times = [
//     {
//         id: 0,
//         input1: 15.256,
//         input2: 15.256,
//         input3: 15.256,
//     }

// ]

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

app.delete('/logs/:id', (req, res) => {
        let index = logs.findIndex(logs => +logs.id === +req.params.id)
        logs.splice(index, 1)
        res.status(200).send(logs)
})

app.listen(5555, () => console.log('up on 5555'))