const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    username: {type: 'String', required: true},
    password: {type: 'String', required: true},
    notes: {
        type: Array
    }
});

// userSchema.prehook('save',
//   async function(next) {
//       const user = this;
//       const hash = await bcrypt.hash(this.password, 10);
//       this.password = hash;
//       next();
//   });

// userSchema.methods.isValidPassword = async function(password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, User.password);

//   return compare;
// }


const User = mongoose.model('user', userSchema);
module.exports = User;