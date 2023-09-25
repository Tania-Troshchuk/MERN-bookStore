import express from "express";
import { Book } from "../models/bookModel.js";
import { asyncMiddleware } from "../middleware/asyncMiddleware.js";
const bookRouter = express.Router()

bookRouter.get('/', asyncMiddleware(async (req, res) => {
  const books = await Book.find().sort('title')

  return res.status(200).json({
    count: books.length,
    data: books
  })
}))

bookRouter.get('/:id', asyncMiddleware(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (!book) {
    return res.status(404).send({ message: 'Book with given ID not found' })
  }

  return res.status(200).json(book)
}))

bookRouter.post('/', asyncMiddleware(async (req, res) => {
  if (!(req.body.title && req.body.author && req.body.publishYear)) {
    return res.status(400).send({
      message: "Send all required fields: title, author, publish year"
    })
  }

  const newBook = {
    title: req.body.title,
    author: req.body.author,
    publishYear: req.body.publishYear
  }

  const book = await Book.create(newBook)

  return res.status(201).send(book)
}))

bookRouter.put('/:id', asyncMiddleware(async (req, res) => {
  const result = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  if (!result) {
    return res.status(404).send({ message: 'Book with given ID not found' })
  }

  return res.status(200).json(result)
}))

bookRouter.delete('/:id', asyncMiddleware(async (req, res) => {
  const result = await Book.findByIdAndDelete(req.params.id)

  if (!result) {
    return res.status(404).send({ message: 'Book with given ID not found' })
  }

  return res.status(200).send({ message: 'The book was delete' })
}))

export default bookRouter