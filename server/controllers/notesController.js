const Note = require('../models/note-model');

const getNote = (req,res) => {
    Note.find({}, (err, notes) => {
        if(err){
            return res.status(400).json({ success:false, error:err})
        }
        if(!notes.length) {
            return res.status(404).json({ success: false, error: `Note's not found`})
        }
        return res.status(200).json({ success:true, data:notes})
    })
    .catch(err => console.log(err))
}


const createNote = (req,res) => {
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
}
const updateNote = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    Note.findOne({ _id: req.params.id }, (err, notes) => {
        console.log(notes);
        if (err) {
            return res.status(404).json({
                err,
                message: 'Note not found!',
            })
        }
        notes.title = body.title;
        notes.lastEditTime = body.lastEditTime;
        notes.content = body.content;
        notes
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: notes._id,
                    message: 'Note updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Note not updated!',
                })
            })
    })
}

const deleteNote = async (req,res,next) => {
    Note.findOneAndDelete({"_id": req.params.id})
    .then(data => {
        // console.log(`successfully deleted: ${res.json(data.title)} `);
        res.json(data);
    })
    .catch(next)
}

module.exports = {
    getNote,
    createNote,
    updateNote,
    deleteNote,
}