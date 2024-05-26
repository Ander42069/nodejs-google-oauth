const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    id_google: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
      }, 
    image: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0,
      },
    }, 
    { timestamps: true}
);

module.exports = mongoose.model('user', schema);