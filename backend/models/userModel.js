const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    //obje içerisine fieldları veririz
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true //bütün fieldlara otomatik olarak timestamp ekler
})

module.exports = mongoose.model('User', userSchema); //model oluşturduk