const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    pseudo        : {type: String},
    email         : {type: String, unique: true},
    password      : {type: String},
});

userSchema.plugin(validator);
module.exports = mongoose.model('User', userSchema);