const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const adminMiddleware = (req, res, next) => {
    console.log("hitting middleware")
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("authoriz err")
        return res.status(401).json({ msg: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    if (!token) {
        return res.status(401).json({ msg: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, secret); // Verify the token
        req.user = decoded; // Optionally store the decoded token in req.user for further use
        next();
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
};

module.exports = {
    adminMiddleware
};
