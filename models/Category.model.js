const mongoose = require('mongoose')
const shortid = require('shortid')


const categorySchema = mongoose.Schema({

    '_id': {

        type: String,
        required: true,
        default: shortid.generate
    },
    'title': {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Categories', categorySchema, 'Categories')
