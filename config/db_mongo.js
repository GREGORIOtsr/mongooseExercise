const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongooseExercise");

const db = mongoose.connection;

db.on("error", error => console.log(error));
db.once("open", () => console.log("Connection to MongoDB established"));

module.exports = mongoose;
