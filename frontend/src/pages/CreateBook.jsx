import axios from "axios"
import { Spiner } from "../components/Spiner"
import { BackButton } from "../components/BackButton"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSnackbar } from "notistack"
import { BookForm } from "../components/BookForm"

export const CreateBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishYear: ''
  })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleBookFields = (field, value) => {
    setBook(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveBook = () => {
    setLoading(true)

    axios
      .post('http://localhost:5050/api/books', book)
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
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl my-4">Create Book</h1>

      {loading ? (
        <Spiner />
      ) : (
        <BookForm
          book={book}
          handleBookFields={handleBookFields}
          btnText="Save"
          handleBtnClick={handleSaveBook}
        />
      )}
    </div>
  )
}