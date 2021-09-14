//1. CREATE -> POST 

import express from 'express'
import listEndpoints from 'express-list-endpoints'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)

const currentDirPath = dirname(currentFilePath)

const authorsJSONFilePath = join(currentDirPath, "authors.json")

authorsRouter.post("/", (req, res) => {
    res.send('I am the post')
})


authorsRouter.get("/", (req, res) => {
    const fileContent = fs.readFileSync(authorsJSONFilePath)
    console.log(JSON.parse(fileContent))

    const authors = (JSON.parse(fileContent))

    res.send(authors)

    
})

authorsRouter.get("/:id", (req, res) => {
    res.send('I am the get')
})

authorsRouter.put("/:id", (req, res) =>{
    res.send('I am the post')
})

authorsRouter.delete("/:id", (req, res) => {
    res.send('I am the post')
})

export default authorsRouter