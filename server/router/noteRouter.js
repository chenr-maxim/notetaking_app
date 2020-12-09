const express = require('express')

// const NoteController = require('../controllers/notesController');
const UserController = require('../controllers/userController');

const router = express.Router();


router.get('/user', UserController.getUser);
router.post('/user', UserController.createUser);
router.get('/user/:id', UserController.getUserById);
// router.get('/user/:username', UserController.getUserByUsername)
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

//user route
router.post('/user/signup', UserController.signupUser);
router.post('/user/login', UserController.loginUser);


// router.post('/notes', NoteController.createNote)
// router.get('/notes', NoteController.getNote)
// router.put('/notes/:id', NoteController.updateNote)
// router.delete('/notes/:id', NoteController.deleteNote)

module.exports = router;