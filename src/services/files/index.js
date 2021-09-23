import express from 'express'
import fs from 'fs-extra'
import multer from 'multer'
import {join} from 'path'
import path from 'path'
import { blogPostsJSONFilePath } from '../blogPosts'


const filesRouter = express.Router()
const getBlogsReadableStream = () => fs.createReadStream(blogPostsJSONFilePath)



filesRouter.get("/CSVDownload", async (req, res, next) => {
    try {
      res.setHeader("Content-Disposition", `attachment; filename=blogs.csv`) // this header tells the browser to open the "save file as" dialog
  
      const source = getBlogsReadableStream()
      const transform = new json2csv.Transform({ fields: ["id", "category", "title", "author", "content"] })
      const destination = res
  
      pipeline(source, transform, destination, err => {
        if (err) next(err)
      })
    } catch (error) {
      next(error)
    }
  })

  export default filesRouter