import axios from "axios"
import { Spiner } from "../components/Spiner"
import { BackButton } from "../components/BackButton"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import { BookForm } from "../components/BookForm"

export const EditBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishYear: ''
  })
  const [loading, setLoading] = useState(false)

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
    setLoading(true)

    axios
      .put(`http://localhost:5050/api/books/${id}`, book)
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
      .get(`http://localhost:5050/api/books/${id}`)
      .then((res) => {
        setBook(res.data)
      })
      .catch(err => {
        console.log(err)
        enqueueSnackbar(`Error: ${err.message}`, { variant: 'error' })
      })
      .finally(() => setLoading(false))
  }, [enqueueSnackbar, id])

  return(
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl my-4">Edit Book</h1>

      {loading ? (
        <Spiner />
      ) : (
        <BookForm
          book={book}
          handleBookFields={handleBookFields}
          btnText="Edit"
          handleBtnClick={handleEditBook}
        />
      )}
    </div>
  )
}