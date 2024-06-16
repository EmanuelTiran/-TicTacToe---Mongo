const mongoose = require('mongoose');

const fs = require('fs');

// קריאה של קובץ JSON

const playerSchema = new mongoose.Schema({
    name: String,
    socketId: String,
    symbol: String,
    avatar: String,
    numberVictories: String
});

const gameSchema = new mongoose.Schema({
    roomId: String,
    players: [playerSchema],
    gameMoves: [String],
    step: Number
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
