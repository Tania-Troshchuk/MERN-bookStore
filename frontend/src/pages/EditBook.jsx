import axios from "axios"
import { Spinner } from "../components/Spinner"
import { BackButton } from "../components/BackButton"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import { BookForm } from "../components/BookForm"
import { BASE_URL } from "../config"
import { validation } from "../helpers/validation"

export const EditBook = () => {
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

  const { id } = useParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleBookFields = (field, value) => {
    setBook(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEditBook = () => {
    const isValid = validation(book, setErrors)
    if (!isValid) return

    const updatedBook = {
      ...book,
      description: book.description?.length ? book.description : null
    }
    
    setLoading(true)

    axios
      .put(`${BASE_URL}/api/books/${id}`, updatedBook)
      .then(() => {
        navigate(-1)
        enqueueSnackbar('Book edited successfully', { variant: 'success' })
      })
      .catch(err => {
        enqueueSnackbar(`Error: ${err.response.data.message}`, { variant: 'error' })
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(true)

    axios
      .get(`${BASE_URL}/api/books/${id}`)
      .then((res) => {
        setBook({
          title: res.data.title,
          author: res.data.author,
          publishYear: res.data.publishYear,
          description: res.data.description
        })
      })
      .catch(err => {
        console.log(err)
        enqueueSnackbar(`Error: ${err.message}`, { variant: 'error' })
      })
      .finally(() => setLoading(false))
  }, [enqueueSnackbar, id])

  return(
    <div className="m-4 lg:mx-auto max-w-4xl lg:w-1/2">
      <BackButton />

      <h1 className="text-3xl my-4">Edit Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <BookForm
          book={book}
          handleBookFields={handleBookFields}
          btnText="Edit"
          handleBtnClick={handleEditBook}
          errors={errors}
        />
      )}
    </div>
  )
}