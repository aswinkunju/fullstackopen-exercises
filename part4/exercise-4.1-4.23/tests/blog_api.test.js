const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('backend test', () => {
    let headers
    beforeEach(async () => {
        const newUser = {
            username: 'root',
            name: 'root',
            password: 'password',
        }

        await api
            .post('/api/users')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send(newUser)

        headers = result.body.token
    })
    test('notes are returned as json and contain six blogs', async () => {
        const response = await api
            .get('/api/blogs')
            .auth(headers, { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /application\/json/);
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    test('the unique identifier is id', async () => {
        const response = await api
            .get('/api/blogs')
            .auth(headers, { type: 'bearer' })
        response.body.forEach(blog => {
            assert('id' in blog)
            assert(!('_id' in blog))
        })
    })
    test('post request creates a new blog in DB', async () => {
        const newBlog = {
            title: "test db of blog",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2

        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .auth(headers, { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
        const blogsatEnd = await helper.blogsInDb()
        assert.strictEqual(blogsatEnd.length, helper.initialBlogs.length + 1)
        const titles = blogsatEnd.map(blog => blog.title)
        assert(titles.includes("test db of blog"))
    })
    test('likes default to zero when no value is passes', async () => {
        const newBlog = {
            title: "test db of blog",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .auth(headers, { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.likes, 0)
    })
    test('title or url is missing', async () => {
        const newBlog = {
            author: "Robert C. Martin"
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .auth(headers, { type: 'bearer' })
            .expect('Content-Type', /application\/json/)
    })
    test('deletion of a blog using id', async () => {
        const blogStart = await helper.blogsInDb()
        const newBlog = {
            title: "The best blog ever",
            author: "Me",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .auth(headers, { type: 'bearer' })
            .expect(201)

        const allBlogs = await helper.blogsInDb()
        const blogToDelete = allBlogs.find(blog => blog.title === newBlog.title)

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .auth(headers, { type: 'bearer' })
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, blogStart.length)

        const title = blogsAtEnd.map(blog => blog.title)
        assert(!title.includes(blogToDelete.title))
        // expect(contents).not.toContain(blogToDelete.title)
    })
    /* test('updating the blogs', async () => {
        const blogStart = await helper.blogsInDb()
        const blogToUpdate = blogStart[0]
        const update = {
            likes: 10
        }
        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(update)
            .expect(200)
            .expect("Content-Type", /application\/json/);
        assert.strictEqual(response.body.likes, 10)
    }) */
})

after(async () => {
    await mongoose.connection.close()
})