const mongoose = require('mongoose');
async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then(res=>console.log("### DB - Connection ###"))
    } catch (error) {

    }
}
module.exports = {connect};