export const validation = (book, setErrors) => {
  const errors = {
    title: null,
    author: null,
    publishYear: null,
  }

  if (!book.title || book.title?.length < 2) {
    errors.title = "The title should contain at least 2 characters"
  }

  if (!book.author) {
    errors.author = "Please fill the author"
  }

  if (!book.publishYear || book.publishYear > new Date().getFullYear()) {
    errors.publishYear = "Please check the publish year"
  }

  if (errors.title || errors.author || errors.publishYear) {
    setErrors(errors)
    return false
  }

  return true
}