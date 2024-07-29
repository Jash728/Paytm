const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://paytmjash:paytmjash@cluster0.245qzab.mongodb.net/paytmclone", {}, (err) => {
    if (err) {
        console.log("error in db connections....")
    } else {
        console.log("db connected....")
    }
})

// backend/db.js
const mongoose = require('mongoose');

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
	User
};