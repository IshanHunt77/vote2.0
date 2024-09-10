const express = require('express');
const { Admin, Poll, Polls, Count } = require('../db'); // Adjust the path to your models
const { secret, jwt } = require('../config'); // Adjust the path to your config
const { adminMiddleware } = require('../middlewares/admin'); // Adjust the path to your middleware

const router = express.Router();

// Endpoint to sign up a new admin
router.post("/signup", async (req, res) => {
    const { name, address, password } = req.body;
    try {
        await Admin.create({ name, address, password });
        res.json({ msg: "Admin Created" });
    } catch (e) {
        console.log("Server Error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint for admin sign in
router.post("/signin", async (req, res) => {
    const { name, password } = req.body;
    try {
        const adminExist = await Admin.findOne({ name, password });
        if (!adminExist) {
            return res.json({ msg: "Admin does not Exist" });
        } else {
            const token = jwt.sign({ name, password }, secret);
            res.json({ token });
        }
    } catch (e) {
        console.log("Server Error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Initialize count on server start
 let count = 0;

// const initializeCount = async () => {
//     const counterDoc = await Count.findOne({});
//     if (!counterDoc) {
//         // If count document doesn't exist, create it with count as 0
//         const newCounter = new Count({ count: 0 });
//         await newCounter.save();
//         count = 0;
//     } else {
//         // Use the existing count
//         count = counterDoc.count;
//     }
// };

// // Call the initialize function on server start
// initializeCount();

// Endpoint to create a new poll
router.post("/createpoll", adminMiddleware, async (req, res) => {
    count++; // Increment the count
    const { candidates, adminId } = req.body;
    // const newPollAddress = `${adminId}${count}`;

    try {
        if (!candidates || !adminId) {
            return res.status(400).json({ error: "Missing candidates or admin ID" });
        }

        // Create a new poll
        await Polls.create({ candidates, createdBy: adminId });
        
        // Update the count in the database
        //await Count.updateOne({}, { $set: { count: count } });

        res.json({ msg: "Poll is created" });
    } catch (e) {
        console.log("Server Error", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to get all polls created by an admin
router.get("/polls", adminMiddleware, async (req, res) => {
    const { adminId } = req.query;
    console.log("Received adminId:", adminId); // Log received adminId
    try {
        const query = { createdBy: adminId };
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
