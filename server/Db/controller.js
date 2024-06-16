const mongoose = require('mongoose');
const Game = require('./schames');
const dotenv = require('dotenv');
dotenv.config();

const readData = async () => {
    try {
        const games = await Game.find({});
        return games;
    } catch (error) {
        console.error("Error in reading data:", error);
        return null;
    }
};
const readOneGame = async (roomId) => {
    try {
        const game = await Game.findOne({ roomId });
        return game;
    } catch (error) {
        console.error("Error in reading game data:", error);
        return null;
    }
};
async function roomIds() {
    try {
        // Fetch all games from the database
        const games = await Game.find({});
        
        // Extract roomIds from the games
        const roomIds = games.map(game => game.roomId);
        console.log(roomIds);
        // Return the roomIds in an object
        return  roomIds;
    } catch (error) {
        console.error("Error fetching room IDs:", error);
        throw error;
    }
}

const newRoomId = async () => {
    let numRoom;  
    let isUnique = false;

    while (!isUnique) {
        numRoom = Math.floor(Math.random() * 900000) + 100000; // Generate a random number between 100000 and 999999
        // console.log(numRoom)
        const existingGame = await Game.findOne({ roomId: numRoom });

        if (!existingGame) {
            isUnique = true;
        }
    }
    return {numRoom};
};

const writeData = async (newGameData) => {
    try {
        const newGame = new Game(newGameData);
        await newGame.save();
        return readData();
    } catch (error) {
        console.error("Error in writing data:", error);
    }
};

const updateData = async (id, field, newData, index = 0) => {
    try {
        let game = await readOneGame(id);

        if (field === 'socketId' || field === 'name' || field === 'avatar' || field === 'numberVictories') {
            game.players[index][field] = newData;
        } else {
            game[field] = newData;
        }

        await game.save();

        return { [field]: game[field] };
    } catch (error) {
        console.error("Error in updating data:", error);
        return null;
    }
};
const createGame = async (id, name = 'Player 1', socketId) => {
    const newGame = {
        "roomId": id,
        "players": [
            { "socketId": socketId, "name": name, "symbol": "X", 'avatar': "", 'numberVictories': "" },
            { "socketId": '', "name": "Player 2", "symbol": "O", 'avatar': "", 'numberVictories': "" }
            ],
            "gameMoves": ["", "", "", "", "", "", "", "", ""],
            "step": 0
    };
    
    try {
        let game = await readOneGame(id);
        
        if (!game) {
            game = new Game(newGame);
            await game.save();
        } else {
            game.players = newGame.players;
            game.gameMoves = newGame.gameMoves;
            game.step = newGame.step;
            await game.save();
        }

        return game;
    } catch (error) {
        console.error("Error in creating game:", error);
        return null;
    }
};



module.exports = { readOneGame, writeData, updateData, createGame, newRoomId, roomIds };