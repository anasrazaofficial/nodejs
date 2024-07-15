const mongoose = require('mongoose');
const { MONGO_URL } = process.env

exports.connectWithDatabase = () => {
    mongoose.connect(MONGO_URL).then(console.log("DB CONNECTED SUCCESSFULLY")).catch(err => {
        console.log("DB CONNECTION FAILED");
        console.log(err);
        process.exit(1);
    })
}