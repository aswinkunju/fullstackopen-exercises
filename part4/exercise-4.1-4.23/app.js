const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGO_URL)

mongoose.connect(config.MONGO_URL)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })
app.use(cors())
app.use(express.static('dist'))

app.use(express.json());


app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)
app.use(middleware.requestLogger)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs',middleware.userExtractor ,blogRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app