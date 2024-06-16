const express = require('express'),
    app = express(),
    { createServer } = require('http'),
    { Server } = require("socket.io")
cors = require("cors");

const { checkWin, isValidQueue, isValidJoin, newGame } = require('./function');
const { readOneGame, updateData, createGame, newRoomId, roomIds } = require('./Db/controller');
const { log } = require('console');

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', mehodes: '*' } });

io.on('connection', socket => {

    socket.on('createGame', async (name) => {
        console.log("createGame at server: ", name);
        try {
            let { numRoom } = await newRoomId();
            console.log({ numRoom })
            createGame(numRoom, name, socket.id)
            socket.join(numRoom)
            socket.emit('numRoom', { roomId: numRoom, socketId: socket.id })
        } catch (error) {
            console.error(error);
            socket.emit('error', { message: error.message });
        }
    })

    socket.on('joinGame', async (numRoom) => {
        try {
            if (!(await roomIds()).includes(numRoom.toString())) {
                throw new Error('The room does not exist');
            }

            let checkJoin = await isValidJoin(numRoom, socket.id);
            if (checkJoin) {
                let data = await readOneGame(numRoom)
                socket.join(numRoom)
                if (data.players[0].socketId !== socket.id) {
                    await updateData(numRoom, "socketId", socket.id, 1)
                }
            }

            socket.emit('checkRoom', { flag: checkJoin, roomId: numRoom, socketId: socket.id })
        } catch (error) {
            console.error(error);
            socket.emit('error', { message: error.message });
        }
    })

    socket.on('updateData', async ({ index, socketId, numRoom }) => {
        console.log("updateData at server: ", index, socketId, numRoom);
        try {
            let result;
            let win = await checkWin(numRoom);
            if (win) {
                const { step, gameMoves } = await readOneGame(numRoom);
                result = { win, step, gameMoves };
            }
            else {
                if (!(await isValidQueue(numRoom, socket.id))) {
                    throw new Error('Invalid turn or player not authorized.');
                }
                let { gameMoves, step, players } = await readOneGame(numRoom)
                console.log({players});
                gameMoves[index] = (players[0].socketId === socket.id ? 'X' : 'O')
                result = await updateData(numRoom, "gameMoves", gameMoves)
                await updateData(numRoom, "step", ++step);
                let win = await checkWin(numRoom);
                if (win) {
                    const { step, gameMoves } = await readOneGame(numRoom);
                    result = { win, step, gameMoves };
                }
            }
            io.to(numRoom).emit('updated', result)
        } catch (error) {
            console.error(error);
            socket.emit('error', { message: error.message });
        }
    })

    socket.on('newGame', async (numRoom) => {
        try {
            const result = await newGame(numRoom);
            io.to(numRoom).emit('updatedNew', result);
            io.emit('updatedNew', result);
        } catch (error) {
            console.error(error);
            socket.emit('error', { message: error.message });
        }
    })

})
const Game = require('../server/Db/schames'); // Assuming gameModel.js contains the code you provided

// const newGame1 = new Game({
//     roomId: '123456',
//     players: [
//         { name: 'Player 1', socketId: 'socket1', symbol: 'X', avatar: 'avatar1', numberVictories: '3' },
//         { name: 'Player 2', socketId: 'socket2', symbol: 'O', avatar: 'avatar2', numberVictories: '2' }
//     ],
//     gameMoves: ['A1', 'B2', 'C3'],
//     step: 5
// });
// newGame1.save()
// .then((savedGame) => {
//     console.log('Game saved successfully:', savedGame);
// })
// .catch((err) => {
//     console.error("------------",err);
// });


app.use(express.json());

app.get('/gameData/:id', (req, res) => {
    const { id } = req.params;
    try {
        res.json(readOneGame(id));
    } catch (error) {
        console.log({ error });
        res.status(500).send('Internal Server Error');
    }

});

app.post('/newGame/:id', (req, res) => {
    const { id } = req.params;

    try {
        const newGame = ["", "", "", "", "", "", "", "", ""];
        const gameMoves = updateData(id, 'gameMoves', newGame);
        const step = updateData(id, "step", 0);
        res.send({ gameMoves, step });

    } catch (error) {
        console.log({ error });
        res.status(500).send('Internal Server Error');
    }

})

const { connect } = require('./Db/dbMongo')
connect();
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});