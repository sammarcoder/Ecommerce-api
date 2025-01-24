const jwt = require("jsonwebtoken");
require("dotenv").config();


const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log("Token: ", token);

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        console.log(req.user)
        // console.log('Decoded Token: ', decoded);
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};

module.exports = authenticate;
