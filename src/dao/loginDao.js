const { User } = require('../../models')
const jwt = require('../jwt/jwtUtills')
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();


async function register(userDetails) {
    try {
        console.log('userDetails---------------', userDetails);
        const hash = bcrypt.hashSync(userDetails.password, salt)
        const student = await User.create({
            userId: userDetails.userId,
            password: hash,
            email: userDetails.email
        })
        if (student) {
            return 'user successfully registered'
        } else {
            return 'user not registered.'
        }
    } catch (error) {
        console.log('Error while registering the user', error);
    }
}

async function login(loginDetails) {
    try {
        const user = await User.findOne({
            where: {
                userId: loginDetails.userId
            }
        })
        if (user) {
            const passwordMatch = await bcrypt.compare(loginDetails.password, user.password);
            if (passwordMatch) {
                const accessToken = jwt.generateAccessToken(loginDetails);
                const refreshToken = jwt.generateRefreshToken(loginDetails);
                if (refreshToken) {
                    updateUserDetails(loginDetails.userId, refreshToken);
                }
                return { accessToken, refreshToken };
            } else {
                console.log('Password does not match.');
                return false;
            }
        } else {
            return 'Invalid credentials'
        }
    } catch (error) {
        console.log('Error while lgging in', error);
    }
}

async function users() {
    try {
        const list = await User.findAll({ raw: true });
        return list;
    } catch (error) {
        console.log('Error---------------------', error);
        return 'Error while fetching the user details'
    }
}

async function updateUserDetails(userId, refreshToken) {
    const userUpdated = await User.update({ refreshToken: refreshToken }, { where: { userId: userId } });
    if (userUpdated) {
        console.log('User refresh token added successfully', refreshToken);
    } else {
        console.log('Error while updating the refresh token in the user table');
    }
}

module.exports = {
    login,
    register,
    users
}