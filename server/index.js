const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const apiPort = 5000

const db = require('./db')
const notesRouter = require('./router/noteRouter')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', notesRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))