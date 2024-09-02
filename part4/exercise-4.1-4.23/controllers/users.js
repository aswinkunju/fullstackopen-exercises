const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs',{title: 1,author: 1,url: 1,likes:1})
    if (users) {
        response.status(200).json(users)
    }
    else {
        response.status(500).json({ error: 'Internal server error' });
    }
})
userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if( password.length<3){
      return response.status(400).json({ error: 'expected password to have more than 3 characters' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username, name, passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter