const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema ({
    title: { type: 'String', required: true},
    lastEditTime: { type: String, required: true},
    content: { type: String, required: true},
    // contentState: {type: Object, required: true}
});

const Notes = mongoose.model('Note', NoteSchema);

module.exports = Notes;