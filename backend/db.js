const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://paytmjash:paytmjash@cluster0.245qzab.mongodb.net/paytmclone"
);

// Create a Schema for Users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },

  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
