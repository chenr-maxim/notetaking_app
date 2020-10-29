const mongoose = require('mongoose')
const myMongoUrl = require('./credentials');

mongoose
    .connect(myMongoUrl, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('db connected'))
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db