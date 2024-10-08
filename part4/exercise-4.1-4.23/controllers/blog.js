const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const logger = require('../utils/logger')
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')


blogRouter.get('/hello', (request, response) => {
    response.send("<h1>Hello world</h1>")
})

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    if (blogs) {
        response.status(200).json(blogs)
    }
    else {
        response.status(500).json({ error: 'Internal server error' });
    }
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: request.user._id.toString()
    })
    const savedBlog = await blog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()
    response.status(201).json(savedBlog)
})
blogRouter.delete('/:id', async (request, response) => {
    
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === request.user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'unauthorised user! you can only delete your blog' })
    }
})
blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    const modifiedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(modifiedBlog)
})

module.exports = blogRouter