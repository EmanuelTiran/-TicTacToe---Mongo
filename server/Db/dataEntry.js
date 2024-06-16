
const { connect } = require('./dbMongo');
const dotenv = require('dotenv');
dotenv.config();
const Game = require('./schames');

const gameData = new Game({
    "roomId": "123456",
    "players": [
        {
            "socketId": "KD9Uit85zyBWxaH2AAAH",
            "name": "Player 1",
            "symbol": "X",
            "avatar": "",
            "numberVictories": ""
        },
        {
            "socketId": "iqLq1fi0deaOSWQHAAAJ",
            "name": "Player 2",
            "symbol": "O",
            "avatar": "",
            "numberVictories": ""
        }
    ],
    "gameMoves": [
        "X",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ],
    "step": 1

})


connect().then(() => {
    gameData.save()
})