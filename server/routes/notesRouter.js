const express = require('express');
const router = express.Router();
const Note = require('../models/note-model');

// router.get('/notes', (req, res, next) => {
//     Note.find({}, 'title')
// })

router.post('/notes', (req, res, next) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        // contentState: req.body.contentState,
        lastEditTime: req.body.lastEditTime
    });

    Note.create(newNote)
        .then(function(dbNote) {
            console.log(dbNote);
            res.json(dbNote);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
});

// router.delete('/notes', (req, res, next) => {
    
// })

module.exports = router;