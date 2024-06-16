const { readOneGame, updateData } = require('./Db/controller');

async function checkWin(id) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let data = await readOneGame(id);
    let { gameMoves, step } = data;

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (gameMoves[a] === 'X' && gameMoves[b] === 'X' && gameMoves[c] === 'X') {
            return `X win at cells: ${a.toString()}, ${b.toString()}, ${c.toString()}  ${step.toString()}`;

        }
        if (gameMoves[a] === 'O' && gameMoves[b] === 'O' && gameMoves[c] === 'O') {
            return `O win at cells: ${a.toString()}, ${b.toString()}, ${c.toString()} ${step.toString()}`;

        }
    }
}
const isTurnX = async (id) => {
    let step = await readOneGame(id)['step'];
    return step % 2 == 0;
}
const isValidQueue = async (numRoom, socketId) => {
    let game = await readOneGame(numRoom);
    console.log(game);
    return (socketId === game.players[0].socketId && await isTurnX(numRoom)
        || socketId === game.players[1].socketId && await !isTurnX(numRoom))
        && game.players[1].socketId !== "";
}


const isValidJoin = async (numRoom, socketId) => {
    let game = await readOneGame(numRoom);
    return game.players[1].socketId === ""
        || socketId === game.players[0].socketId
        || socketId === game.players[1].socketId
}

const newGame = async (numRoom) => {
    const newGame = ["", "", "", "", "", "", "", "", ""];
    await updateData(numRoom, "step", 0);
    const gameMoves = await updateData(numRoom, 'gameMoves', newGame);
    return gameMoves;
}

module.exports = { checkWin, isTurnX, isValidQueue, isValidJoin, newGame };