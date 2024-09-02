const _ = require('lodash');
const dummy = (blogs) => {
    console.log('blogs')

    return 1
}
const totalLikes = (blogs) => {
    // console.log(blogs.length);
    if (blogs.length ===0) { return 'No blogs in the list' }
    let totalLikes = blogs.reduce((sum, blog) => sum += blog.likes, 0);
    return (totalLikes);
}

const favoriteBlog = (blogs) => {
    if (blogs.length ===0) { return 'No blogs in the list' }
    const favoriteBlog = blogs.reduce((fav, blog) => (fav.likes < blog.likes) ? blog : fav, blogs[0])
    return((({ title, author, likes }) => ({ title, author, likes }))(favoriteBlog))
}

const mostBlogs =(blogs)=>{
    if (blogs.length ===0) { return 'No blogs in the list' }
    const authorBlogCounts = _.countBy(blogs, 'author');
    const authorBlogCountsArray = _.map(authorBlogCounts, (count, author) => ({
        author: author,
        blogs: count
    }));
    return(_.maxBy(authorBlogCountsArray, 'blogs'));
}

const mostLikes =(blogs)=>{
    if (blogs.length ===0) { return 'No blogs in the list' }
    const groupedByAuthor = _.groupBy(blogs, 'author');
    const authorLikes = _.map(groupedByAuthor, (blogs, author) => ({
        author: author,
        likes: _.sumBy(blogs, 'likes')
    }));
    return (_.maxBy(authorLikes, 'likes'));
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}