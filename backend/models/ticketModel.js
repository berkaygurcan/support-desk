const mongoose = require('mongoose');


const ticketSchema = mongoose.Schema({
    //obje içerisine fieldları veririz
    user: {
        type: mongoose.Schema.Types.ObjectId, // user ile ilişkili
        required: [true],
        ref: 'User' //user collectionu olduğunu belirttik
    },
    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['iPhone', 'Macbook Pro', 'iMac','iPad'] //spesifik productlarımız olucaz enum ile belirtiyoruz
    },
    description: {
        type: String,
        required: [true, 'Please enter a description of the issue']
    },
    status: {
        type: String,
        required: true,
        enum: ['new','open','closed'],
        default: 'new'
    }
},
{
    timestamps: true //bütün fieldlara otomatik olarak timestamp ekler
})

module.exports = mongoose.model('Ticket', ticketSchema); //model oluşturduk