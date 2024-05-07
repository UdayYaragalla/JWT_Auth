const express = require('express')
const app = express();
const authRouter = require('./src/routes/auth')
const courseRouter = require('./src/routes/course')
const jwtUtil = require('./src/jwt/jwtUtills')

const port = 8090

app.use(express.json());

app.use((req, res, next) => {
    if (req.path == '/user/login') {
        next(); // Skip authentication middleware for login route
    } else {
        jwtUtil.authenticateToken(req, res, next); // Apply authentication middleware to other routes
    }
});
app.use('/user', authRouter)
app.use('/course', courseRouter)



app.use((req, res, next) => {
    next();
})

app.listen(port)