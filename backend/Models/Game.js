const mongoose = require('mongoose')
const PlayerSchema = require('./Player')

const GameSchema = new mongoose.Schema({
    //number of words in the game
    wordArray : [{type: String}],

    //Are players allowed to join
    joinPermission : {
        type : Boolean,
        default: true
    },

    //Has the game finished or not
    //Changed from the name isOpen
    isOpen : {
        type : Boolean,
        default: true
    },

    isOver : {
        type : Boolean,
        default: false        
    },

    //Array containing the players
    players: [PlayerSchema.schema],

    //Starting time of the game
    startTime : {
        type : Number
    }
})

module.exports = mongoose.model('game', GameSchema)