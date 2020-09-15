const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, require: true, unique: true },
  nome: { type: String, require: true },
  cognome: { type: String, require: true },
  password: { type: String, require: true, minlength: 6 },
  hasCar: { type: Boolean, require: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
