const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
    //index that the user is on 
    currWordInd : {
        type: Number,
        default: 0
    },

    //unique identifier for every socket
    socketID : {
        type : String
    },

    //Is the player the creator of game
    isCreator : {
        type : Boolean,
        default : false
    },

    //typing speed of the player
    speedWPM : {
        type: Number,
        default: -1
    },

    userName : {
        type: String
    }
})

module.exports = mongoose.model('player', PlayerSchema)
