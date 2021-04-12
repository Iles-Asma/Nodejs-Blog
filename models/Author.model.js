const mongoose = require('mongoose')
const shortid = require('shortid')

const authorSchema = mongoose.Schema({

    '_id': {

        type: String,
        required: true,
        default: shortid.generate
    },
    'name': {

        type: String,
        required: true
    }
})


module.exports = mongoose.model('Authors', authorSchema, 'Authors')
