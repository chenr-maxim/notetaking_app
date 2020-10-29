const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://max:chen@cluster0.tbjhk.mongodb.net/notetaking_app?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('db connected'))
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db