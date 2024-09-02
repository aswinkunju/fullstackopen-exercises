const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user');
const bcrypt = require('bcrypt');

const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('123456', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })
    test('new user is added sucessfully', async () => {
        const usersAtStart = await helper.usersInDB()
        const newUser = {
            username: 'aswin',
            name: 'Aswin',
            password: '123456'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
        const usernames = usersAtEnd.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })
    test('new user is not created when username is unique', async () => {
        const usersAtStart = await helper.usersInDB()
        const newUser = {
            username: 'root',
            name: 'Aswin',
            password: '123456'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('expected `username` to be unique'));
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    })
    test('new user is not created when password is less than 3 character ', async () => {
        const usersAtStart = await helper.usersInDB()
        const newUser = {
            username: 'kunju',
            name: 'Aswin',
            password: '12'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('expected password to have more than 3 characters'));
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test('new user is not created when username is less than 3 character ', async () => {
        const usersAtStart = await helper.usersInDB()
        const newUser = {
            username: 'a',
            name: 'Aswin',
            password: '123456'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('User validation failed: username: Name must be atleast 3 chatacter long'));
        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

})

after(async () => {
    await mongoose.connection.close()
})