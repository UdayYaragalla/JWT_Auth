const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.ACCESS_REFRESH_TOKEN_SECRET

/* Generate access token */
function generateAccessToken(user) {
    const payload = {
        userId: user.userId
    };
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, accessTokenSecret, options);
}

/* Verify access token */
async function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, accessTokenSecret);
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/* Authenticate the access token */
async function authenticateToken(req, res, next) {
    console.log('entered899797898798798797987');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    const result = await verifyAccessToken(token);

    if (!result.success) {
        return res.status(403).json({ error: result.error });
    }

    req.user = result.data;
    next();
}

// Generate Refresh Token
function generateRefreshToken(user) {
    const payload = {
        userId: user.userId
    };
    const options = { expiresIn: '7d' };

    return jwt.sign(payload, refreshTokenSecret, options);
}

// Verify Refresh Token
function verifyRefreshToken(token) {
    try {
        const data = jwt.verify(token, refreshTokenSecret);
        return data;
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateAccessToken,
    verifyAccessToken,
    authenticateToken,
    generateRefreshToken,
    verifyRefreshToken
}