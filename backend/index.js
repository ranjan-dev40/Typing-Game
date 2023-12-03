const express = require('express')
const app = express()
const socketio = require('socket.io')
const mongoose = require('mongoose')

const OpenAIAPI = require('openai')
const openai = new OpenAIAPI({apiKey: ""})

const server = app.listen(5000) 
const io = socketio(server, {cors: {origin: "*"}})

//CORS
var cors = require('cors')
const corsOptions = {
  origin: '*',
  credentials: true,
};
app.use(cors(corsOptions))
app.use(express.json())

//Chat GPT implementation here
app.post('/chatgpt', async (req, res) => {
    try {
      const prompt = req.body.prompt; // Ensure req.body and req.body.prompt are defined
      console.log(prompt)
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      const aiResponse = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
    });
        console.log("[apiResponse]", aiResponse);
      const text = aiResponse.choices[0].message;
      res.status(200).json({ text });
    } catch (error) {
      console.error(error);
      res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
    }
});

const Game = require('./Models/Game')
const Code = require('./Models/Code')
const QuotableAPI = require('./QuotableAPI')
const Image = require('./Models/Image')

// const mongoURI = "mongodb://localhost:27017/typinggame"
const mongoURI = "mongodb+srv://minor-project:k4fSgmpNuI9Am6gZ@cluster0.le9ctvj.mongodb.net/typing-game?retryWrites=true&w=majority"
mongoose.connect(mongoURI, console.log("Connected to DB")) 

const calculateTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    return `${minutes}:${seconds < 10 ? "0"+seconds : seconds}`
}

const calculateWPM = (endTime, startTime, player) => {
    let numOfWords = player.currWordInd

    const timeInSeconds = (endTime - startTime) / 1000
    const timeInMinutes = timeInSeconds / 60
    const WPM = Math.floor(numOfWords / timeInMinutes)
    return WPM
}

const startGameClock = async (gameID) => {
    let game = await Game.findById(gameID)
    game.startTime = new Date().getTime()
    game = await game.save()

    let time = 120

    let timerID = setInterval(function gameIntervalFunc() {
 
        if (time >= 0) {
            const formatTime = calculateTime(time)
            io.to(gameID).emit('timer', {countDown : formatTime, msg : "Time Remaining"})
            time--
        } else {
            (async ()=> {
                let endTime = new Date().getTime()

                let game = await Game.findById(gameID)

                let {startTime} = game
                game.isOver = true

                game.players.forEach((player, index) => {
                    if (player.speedWPM === -1) {
                        game.players[index].speedWPM = calculateWPM(endTime, startTime, player)
                    }
                })
                game = await game.save()
                io.to(gameID).emit('updateGame', game)
                clearInterval(timerID)
            })()
        }

        return gameIntervalFunc
    }(), 1000)
}


io.on('connect', (socket)=> {

    socket.on('userInput', async ({userInput, gameID}) => {
        try {
            let game = await Game.findById(gameID)

            if (!game.isOpen && !game.isOver) {

                let player = game.players.find(player => player.socketID === socket.id)

                let word = game.wordArray[player.currWordInd]

                if (word === userInput) {
                    player.currWordInd++
                    if (player.currWordInd !== game.wordArray.length) {
                        game = await game.save()
                        io.to(gameID).emit('updateGame', game)
                    } 
                    else {
                        let endTime = new Date().getTime()    
                        let {startTime} = game
                        player.speedWPM = calculateWPM(endTime, startTime, player)

                        game = await game.save()
                        socket.emit('done')
                        io.to(gameID).emit('updateGame', game)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('timer', async ({gameID, playerID})=> {
        let countDown = 5
        let game = await Game.findById(gameID)
        let player = game.players.id(playerID)

        if (player.isCreator) {
            let timerID = setInterval(async() => {
                if (countDown >= 0) {
                    io.to(gameID).emit('timer', {countDown, msg : "Starting Game"})
                    countDown--
                } else {
                    game.isOpen = false
                    game = await game.save()
                    io.to(gameID).emit('updateGame', game)
                    await startGameClock(gameID)
                    clearInterval(timerID)
                }
            }, 1000)
        }
    })

    socket.on('join-game', async ({gameID : _id, userName: userName}) => {
        try {
            let game = await Game.findById(_id)
            if (game.isOpen) {
                const gameID = game._id.toString()
                socket.join(gameID)
                let player = {
                    socketID : socket.id,
                    userName: userName
                }
                game.players.push(player)
                game = await game.save()
                io.to(gameID).emit('updateGame', game)
            }
        } catch (err) {
            console.log(err)
        }
    })

    socket.on('create-game', async (settings)=>{
        try{

            let quotableData = ["a", "b", "c"]
            if (settings.gameMode === "paragraph") {

                quotableData = await QuotableAPI()

            }
            else if (settings.gameMode === "code") {

                let codeList = await Code.find({language: settings.language})
                let randomIndex = Math.floor(Math.random() * codeList.length)
                let codeSnippet = codeList[randomIndex].codeArray
                  
                quotableData = codeSnippet
            } 

            let game = new Game()
            game.wordArray = quotableData 
    
            let player = {
                socketID: socket.id,
                isCreator: true,
                userName: settings.userName
            }
            
            game.players.push(player)

            game = await game.save()

            const gameID = game._id.toString()
            
            socket.join(gameID) 
            
            io.to(gameID).emit('updateGame', game)


        } catch (err) {
            console.log(err)
        }
    })

    socket.on('getimage', async ()=> {

        const data = await Image.find({})

        // Get a random index
        const randomIndex = Math.floor(Math.random() * data.length);

        imgurl = data[randomIndex].url
        socket.emit('imgurl', imgurl)
    })

    socket.on('userpara', async (userpara)=> {
        
        try {

            //Prompt for mistakes
            const prompt = `Find the grammatical mistakes in the given paragraph: ${userpara}. Also find what extra points can be added in this paragraph. Provide response in the form of a paragraph`; // Ensure req.body and req.body.prompt are defined
            const aiResponse = await openai.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "gpt-3.5-turbo",
            });  
            // console.log("[apiResponse]", aiResponse);
            const text = aiResponse.choices[0].message;


            socket.emit('gptpararesponse', text.content)

        } catch (error) {
            console.error(error);
            console.log("Some error occured")
        }
    })
})













                // let y = new Code
                // y.language = "javascript",
                // y.codeArray = [
                //     "function",
                //     "kadanesAlgorithm(",
                //     "arr",
                //     ")",
                //     "{",
                //     "let",
                //     "maxEndingHere",
                //     "=",
                //     "arr[0];",
                //     "let",
                //     "maxSoFar",
                //     "=",
                //     "arr[0];",
                //     "for",
                //     "(",
                //     "let",
                //     "i",
                //     "=",
                //     "1;",
                //     "i",
                //     "<",
                //     "arr.length;",
                //     "i++",
                //     ")",
                //     "{",
                //     "maxEndingHere",
                //     "=",
                //     "Math.max(",
                //     "arr[i]",
                //     ",",
                //     "maxEndingHere",
                //     "+",
                //     "arr[i]",
                //     ");",
                //     "maxSoFar",
                //     "=",
                //     "Math.max(",
                //     "maxSoFar",
                //     ",",
                //     "maxEndingHere",
                //     ");",
                //     "}",
                //     "return",
                //     "maxSoFar;",
                //     "}"
                //   ]           
                // y = await y.save()