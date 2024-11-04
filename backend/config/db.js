const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectiondb = async () => {
    try {
        const database = mongoose.connect(process.env.MONGO_URI);
        if (!database) {
            console.log(`db not connect`);

        }
        console.log(`db connect success`);

    } catch (error) {
        console.log(error);

    }
}

module.exports = connectiondb;