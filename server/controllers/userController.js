const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
// const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');

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

const signupUser = async (req,res) => {
  User.findOne({ username: req.body.username}).then((user) => {
    if(user) {
      console.log('user name is already being used');
      return res.status(400).json({user, message: 'username is already in use'});
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                username: user.username,
              };

              jwt.sign(
                payload,
                'testkey',
                {expiresIn: 36000},
                (err, token) => {
                  console.log(res);
                  res.json({
                    success:true,
                    token: "Bearer " + token,
                    username: user.username,
                    id: user.id,
                  })
                }
              )
            });
        });
      });
    }
  });
};

const loginUser = async (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username}).then((user) => {
    if(!user) {
      // console.log('username does not exist');
      return res.status(400).json({user, message: 'username doesnt exist'});
    }

    bcrypt.compare(password, user.password).then((isMatching) => {
      if(isMatching) {
        const payload = {
          id: user.id,
          username: user.username
        };

        jwt.sign(
          payload,
          'testkey',
          {expiresIn: 36000},
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              username: user.username,
              id: user.id
            });
            console.log('successfully signed in');
          }
        );
      } else {
        console.log('incorrect password');
        return res.status(400);
      }
    });
  });
}

module.exports = {
    getUserById,
    getUser,
    getUserByUsername,
    updateUser,
    deleteUser,
    createUser,
    signupUser,
    loginUser,
}
