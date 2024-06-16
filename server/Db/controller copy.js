const fs = require('fs');

const readData = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

const readOneGame = (path, id) => readData(path)[id];

const roomIds = (path) => Object.keys(readData(path));

const newRoomId = (path) => {
    let number;
    do {
        number = Math.floor(100000 + Math.random() * 900000);
    } while (roomIds(path).includes(number.toString()));
    return number;
};

const writeData = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data));
    return readData(path);
};

const updateData = (path, id, field, newData, index = 0) => {
    let data = readData(path);
    if (field === 'socketId' || field === 'name' || field === 'avatar' || field === 'numberVictories') {
        data[id]['players'][index][field] = newData
        return { [field]: writeData(path, data)[id]['players'][index][field] };
    }
    data[id][field] = newData;
    return { [field]: writeData(path, data)[id][field] };
}

const createGame = (path, id, name = 'Player 1', socketId) => {

    const newGame = {
        "players": [
            { "socketId": socketId, "name": name, "symbol": "X", 'avatar': "", 'numberVictories': "" },
            { "socketId": '', "name": "Player 2", "symbol": "O", 'avatar': "", 'numberVictories': "" }
        ],
        "gameMoves": ["", "", "", "", "", "", "", "", ""],
        "step": 0
    };
    let data = readData(path);
    data[id] = newGame;
    return writeData(path, data)[id];

}

module.exports = { readOneGame, writeData, updateData, createGame, newRoomId, roomIds };