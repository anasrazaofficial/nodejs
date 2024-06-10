const mongoose = require('mongoose');
const { MONGODB_URL } = process.env

exports.connect = () => { // Anyone can import this method and connect with the database
    mongoose.connect(MONGODB_URL).then(console.log("DB CONNECTION SUCCESSFUL")).catch(err => {
        console.log("DB CONNECTION FAILED");
        console.error(err);
        process.exit(1);
    })
}