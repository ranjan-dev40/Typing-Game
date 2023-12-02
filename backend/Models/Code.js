const mongoose = require('mongoose')

const CodeSchema = new mongoose.Schema({

    language: {
        type : String
    },

    codeArray : [{type: String}]
})

module.exports = mongoose.model('code', CodeSchema)