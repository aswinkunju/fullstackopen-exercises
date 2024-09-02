
const Blog = require('../models/blogs')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",

    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

const nonExiatingId  = async() =>{
    const blog = new Blog({title:"hello test"})
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async()=>{
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON()) 
}

const usersInDB =async ()=>{
    const users =await User.find({})
    return users.map(user =>user.toJSON())
}
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzd2lua3VuanUiLCJpZCI6IjY2YjEwZGZiZTJiYjU1NTNjYjRlNjRmZSIsImlhdCI6MTcyMjg4NDg5NX0.SydomHHKeyQsmlOBn2LMrp2dpFZ19pWFd0_5_d0K9xQ'
module.exports ={
    initialBlogs,
    nonExiatingId,
    blogsInDb,
    usersInDB,
    token
}