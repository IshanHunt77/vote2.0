const mongoose = require('mongoose');

// Define the Poll schema
const pollSchema = new mongoose.Schema({
    
    candidates: [String], // Array of candidate names
    createdBy:String
});

// const counter = new mongoose.Schema({
//     count : Number
// })

// Define the Admin schema
const adminSchema = new mongoose.Schema({
    name: String,
    address: String,
    password: String,
    adminpolls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Polls' // Reference to Polls model
    }]
});

// Define the User schema
const userSchema = new mongoose.Schema({
    name: String,
    address: String,
    password: String,
    pollscreated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Polls' // Reference to Polls model
    }]
});

// Create models
const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Polls = mongoose.model('Polls', pollSchema);
// const Count = mongoose.model('Count', counter);

// Export the models
module.exports = {
    Admin,
    User,
    Polls
    // Count
};
