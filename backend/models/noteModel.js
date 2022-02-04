const mongoose = require('mongoose');


const noteSchema = mongoose.Schema({
    //obje içerisine fieldları veririz
    user: {
        type: mongoose.Schema.Types.ObjectId, // user ile ilişkili
        required: [true],
        ref: 'User' //user collectionu olduğunu belirttik
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId, // user ile ilişkili
        required: [true],
        ref: 'Ticket' //user collectionu olduğunu belirttik
    },
    text: {
        type: String,
        required: [true, 'Please add some text']
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String
    },
},
{
    timestamps: true //bütün fieldlara otomatik olarak timestamp ekler
})

module.exports = mongoose.model('Note', noteSchema); //model oluşturduk