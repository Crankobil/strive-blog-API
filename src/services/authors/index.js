//1. CREATE -> POST 

import express from 'express'
import listEndpoints from 'express-list-endpoints'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import uniqid from 'uniqid'

const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)

const currentDirPath = dirname(currentFilePath)

const authorsJSONFilePath = join(currentDirPath, "authors.json")



authorsRouter.post("/", (req, res) => {
console.log(req.body)

const newAuthor = {...req.body, id:uniqid()}

const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath))

authors.push(newAuthor)

fs.writeFileSync(authorsJSONFilePath, JSON.stringify(authors))

    res.status(201).send({id: newAuthor.id})
})



authorsRouter.get("/", (req, res) => {
    const fileContent = fs.readFileSync(authorsJSONFilePath)
    console.log(JSON.parse(fileContent))

    const authors = (JSON.parse(fileContent))

    res.send(authors)  
})



authorsRouter.get("/:authorID", (req, res) => {

    const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath))

    const author = authors.find(a => a.id === req.params.authorID)

    res.send(author)
})



authorsRouter.put("/:authorID", (req, res) =>{
    const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath))

    const remainingAuthors = authors.filter(authors => a.id !== req.params.authorID)

    const updatedAuthors = {...req.body, id:req.params.authorID}

    remainingAuthors.push(updatedAuthors)

    fs.writeFileSync(authorsJSONFilePath, JSON.stringify(remainingAuthors))

    res.send(updatedAuthors)
})




authorsRouter.delete("/:authorID", (req, res) => {
const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath))

const remainingAuthors = authors.filter(a => a.id !== req.params.authorID)

fs.writeFileSync(authorsJSONFilePath, JSON.stringify(remainingAuthors))

    res.send('deleted')
})

export default authorsRouter