const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_STRING);

const db = mongoose.connection;

db.on("error", error => console.log(error));
db.once("open", () => console.log("Connection to MongoDB established"));

module.exports = mongoose;
