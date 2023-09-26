import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
    },
    author: {
      type: String,
      required: true
    },
    publishYear: {
      type: Number,
      required: true
    }, 
    description: {
      type: String,
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
)

export const Book = mongoose.model('Book', bookSchema)

export const bookValidation = (req, allRequired) => {
  if (!(req.body.title && req.body.author && req.body.publishYear) && allRequired) {
    return "Send all required fields: title, author, publish year"
  }

  if (req.body.title.length < 2) {
    return "The title should contain at least 2 characters"
  }

  if (req.body.description?.length > 500) {
    return "The description should be less than 500 characters"
  }
}