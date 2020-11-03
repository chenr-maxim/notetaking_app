const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    username: {type: 'String', required: true},
    note: {
        title: { type: String, required: true},
        lastEditTime: { type: String, required: true},
        content: { type: String, required: true},
        // contentState: {type: Object, required: true}
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;