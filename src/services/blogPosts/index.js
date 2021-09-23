

import express from 'express'
import listEndpoints from 'express-list-endpoints'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import uniqid from 'uniqid'

const blogPostsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)

const currentDirPath = dirname(currentFilePath)

export const blogPostsJSONFilePath = join(currentDirPath, "blogPosts.json")



blogPostsRouter.post("/", (req, res) => {
console.log(req.body)

const newblogPost = {...req.body, id:uniqid(), createdAt: new Date()}

const blogPosts = JSON.parse(fs.readFileSync(blogPostsJSONFilePath))

blogPosts.push(newblogPost)

fs.writeFileSync(blogPostsJSONFilePath, JSON.stringify(blogPosts))

    res.status(201).send({id: newblogPost.id})
})



blogPostsRouter.get("/", (req, res) => {
    const fileContent = fs.readFileSync(blogPostsJSONFilePath)
    console.log(JSON.parse(fileContent))

    const blogPosts = (JSON.parse(fileContent))

    res.send(blogPosts)  
})



blogPostsRouter.get("/:blogPostID", (req, res) => {

    const blogPosts = JSON.parse(fs.readFileSync(blogPostsJSONFilePath))

    const blogPost = blogPosts.find(a => a.id === req.params.blogPostID)

    res.send(blogPost)
})



blogPostsRouter.put("/:blogPostID", (req, res) =>{
    const blogPosts = JSON.parse(fs.readFileSync(blogPostsJSONFilePath))

    const remainingblogPosts = blogPosts.filter(blogPosts => a.id !== req.params.blogPostID)

    const updatedblogPosts = {...req.body, id:req.params.blogPostID}

    remainingblogPosts.push(updatedblogPosts)

    fs.writeFileSync(blogPostsJSONFilePath, JSON.stringify(remainingblogPosts))

    res.send(updatedblogPosts)
})




blogPostsRouter.delete("/:blogPostID", (req, res) => {
const blogPosts = JSON.parse(fs.readFileSync(blogPostsJSONFilePath))

const remainingblogPosts = blogPosts.filter(a => a.id !== req.params.blogPostID)

fs.writeFileSync(blogPostsJSONFilePath, JSON.stringify(remainingblogPosts))

    res.send('deleted')
})

export default blogPostsRouter