import mongoose from "mongoose";
var passportLocalMongoose = require("passport-local-mongoose");

var Schema = mongoose.Schema;

var User = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);
// End of File
