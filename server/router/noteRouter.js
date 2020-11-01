const express = require('express')

const NoteController = require('../controllers/notesController');

const router = express.Router()

router.post('/notes', NoteController.createNote)
router.get('/notes', NoteController.getNote)
router.put('/notes/:id', NoteController.updateNote)
router.delete('/notes/:id', NoteController.deleteNote)

module.exports = router;