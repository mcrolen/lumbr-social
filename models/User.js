const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String, 
});

// .pre creates a function that runs before the object is saved to the DB, in this case, it hashes the password entered by the user
UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
})


// adds a comparePassword method to the UserSchema object, for authorizing logins
UserSchema.methods.comparePassword = function comparePassword(
    candidatePassword,
    cb
) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    })
}

module.exports = mongoose.model("User", UserSchema)