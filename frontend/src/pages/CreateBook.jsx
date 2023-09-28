import axios from "axios"
import { Spinner } from "../components/Spinner"
import { BackButton } from "../components/BackButton"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSnackbar } from "notistack"
import { BookForm } from "../components/BookForm"
import { BASE_URL } from "../config"
import { validation } from "../helpers/validation"

export const CreateBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishYear: '',
    description: null
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    title: null,
    author: null,
    publishYear: null,
  })

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleBookFields = (field, value) => {
    setBook(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveBook = () => {
    const isValid = validation(book, setErrors)
    if (!isValid) return

    const newBook = {
      ...book,
      description: book.description?.length ? book.description : null
    }

    setLoading(true)

    axios
      .post(`${BASE_URL}/api/books`, newBook)
      .then(() => {
        navigate(-1)
        enqueueSnackbar('Book created successfully', { variant: 'success' })
      })
      .catch(err => {
        enqueueSnackbar(`Error: ${err.response.data.message}`, { variant: 'error' })
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="m-4 lg:mx-auto max-w-4xl lg:w-1/2">
      <BackButton />

      <h1 className="text-3xl my-4">Create Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <BookForm
          book={book}
          handleBookFields={handleBookFields}
          btnText="Save"
          handleBtnClick={handleSaveBook}
          errors={errors}
        />
      )}
    </div>
  )
}