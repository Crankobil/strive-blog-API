import express from 'express'
import listEndpoints from 'express-list-endpoints'
import blogPostsRouter from './services/blogPosts/index.js'
import cors from "cors"

const server = express()

const port = 3001    

server.use(cors()) 
server.use(express.json())

server.use("/blogPosts", blogPostsRouter)
console.table(listEndpoints(server))

server.listen(port, () => {
    console.log('server is running now')
})