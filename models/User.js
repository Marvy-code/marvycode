const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    pseudo        : {type: String, required: true, unique: true},
    email         : {type: String, unique: true, required: true},
    password      : {type: String, required: true},
    created_at    : {type: Date, default: Date.now}
});

userSchema.plugin(validator);
module.exports = mongoose.model('User', userSchema);