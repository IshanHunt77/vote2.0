const express = require('express');
const { User, Polls } = require('../db'); // Adjust the path to your models
const { secret, jwt } = require('../config'); // Adjust the path to your config
const { userMiddleware } = require('../middlewares/user'); // Adjust the path to your middleware

const router = express.Router();

// Endpoint to sign up a new user
router.post("/signup", async (req, res) => {
    const { name, address, password } = req.body;
    try {
        await User.create({ name, address, password });
        res.json({ msg: "User Created" });
    } catch (e) {
        console.log("Server Error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint for user sign in
router.post("/signin", async (req, res) => {
    const { name, password } = req.body;
    try {
        const userExist = await User.findOne({ name, password });
        if (!userExist) {
            return res.json({ msg: "User does not Exist" });
        } else {
            const token = jwt.sign({ name, password }, secret);
            res.json({ token });
        }
    } catch (e) {
        console.log("Server Error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

let count = 0;
// Endpoint to create a new poll by a user
router.post("/createpoll", userMiddleware, async (req, res) => {
    count++;
    const { candidates, userId } = req.body;
    const newPollAddress = `${userId}${count}`;
    try {
        await Polls.create({ pollID: newPollAddress, candidates, createdBy: userId });
        res.json({ msg: "Poll is created" });
    } catch (e) {
        console.log("Server Error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to get all polls created by a user
router.get("/polls", userMiddleware, async (req, res) => {
    const { userId } = req.query;
    console.log("Received userId:", userId); // Log received userId
    try {
        const query = { createdBy: userId };
        console.log("Query:", query); // Log the query object
        const response = await Polls.find(query);
        console.log("Query result:", response); // Log query result
        res.json({ response });
    } catch (e) {
        console.log("Server Error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router; // Export the router to be used in the main server file
