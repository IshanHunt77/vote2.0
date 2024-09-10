const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const app = express();

// Apply CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Import the admin and user routes
const adminRoutes = require('./routes/admin'); // Adjust the path to your route file
const userRoutes = require('./routes/user'); // Adjust the path to your route file

// Use the admin routes with the '/admin' prefix
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Connect to MongoDB
async function mong() {
    try {
        await mongoose.connect('mongodb+srv://ishanproj:recum789@cluster0.pqe04.mongodb.net/Voting?retryWrites=true&w=majority');
        console.log("MongoDB connected");
    } catch (e) {
        console.log(e);
    }
}

mong();

// Start the server
app.listen(3013, () => {
    console.log('Server running on port 3012');
});
