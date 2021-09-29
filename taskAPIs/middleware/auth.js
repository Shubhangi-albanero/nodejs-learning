const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({
            message: "Authentication token is required"
        });
    }
    try {
        token = token.substring(7)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
    return next();
};

module.exports = verifyToken;