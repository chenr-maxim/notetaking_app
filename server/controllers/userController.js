const User = require('../models/user-model');

const getUser = async (req,res) => {
    User.find({}, (err,users) => {
        if(err) {
            return res.status(400).json({success:false, error:err})
        }
        if(!users.length) {
            return res.status(404).json({success:false, error:err})
        }
        return res.status(200).json({success:true, data:users})
    })
    .catch(err => console.log(err))
}

const getUserById = async (req,res) => {
    await User.findOne({_id: req.params.id}, (err, user) => {
        if(err) {
            return res.status(400).json({success: false, error: err})
        }

        if(!user) {
            return res
                .status(404)
                .json({success:false, error: 'User not found'})
        }
        return res.status(200).json({success: true, data: user})
    }).catch(err => console.log(err))
}

const getUserByUsername = async (req,res) => {
    await User.find({username: req.params.username}, (err, user) => {
        if(err) {
            return res.status(400).json({success: false, error: err})
        }

        if(!user) {
            return res
                .status(404)
                .json({success:false, error: 'User not found'})
        }
        return res.status(202).json({success: true, data: user})
    }).catch(err => console.log(err))
}

const createUser = async (req,res) => {
    const newUser = new User({
        username: req.body.username,
        notes: {
            // title: req.body.note.noteTitle,
            // content: req.body.note.noteContent,
            // // contentState: req.body.contentState,
            // lastEditTime: req.body.note.lastEditTime        
        }
    });

    User.create(newUser)
        .then(function(dbUser) {
            console.log(dbUser);
            res.json(dbUser);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
}

const updateUser = async (req,res) => {
    const body = req.body
    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'must provide user information to update(body)',
        })
    }

    console.log('this is the body');
    console.log(body);

    User.findOne({_id: req.params.id}, (err, user) => {
        if(err) {
            return res.status(404).json({
                err,
                message: 'User not found',
            })
        }
        user.username = body.username;
        user.notes = body.userNotes;
        user.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'Updated User',
                })
            }).catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated',
                })
            })
    })
}

const deleteUser = async (req,res,next) => {
    User.findOneAndDelete({"_id": req.params.id})
    .then(data => {
        // console.log(`successfully deleted: ${res.json(data.title)} `);
        res.json(data);
    })
    .catch(next)
}

module.exports = {
    getUserById,
    getUser,
    getUserByUsername,
    updateUser,
    deleteUser,
    createUser,
}
