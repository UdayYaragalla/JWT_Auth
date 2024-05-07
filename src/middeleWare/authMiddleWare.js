const jwtUtil = require('../jwt/jwtUtills');
const { User } = require('../../models')

async function authenticateRefreshToken(request, response, next) {
    const refreshToken = request.body.refreshToken;
    const userData = jwtUtil.verifyRefreshToken(refreshToken);
    if (!userData) {
        return response.status(401).json({ error: 'Invalid refresh token' });
    } else {
        const user = await User.findOne({ where: { userId: userData.userId } })
        if (user.refreshToken === refreshToken) {
            const accessToken = jwtUtil.generateAccessToken(userData);
            response.send({ accessToken })
        }
    }
}

module.exports = authenticateRefreshToken;