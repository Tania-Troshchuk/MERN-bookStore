import axios from "axios"
import { Spinner } from "../components/Spinner"
import { BackButton } from "../components/BackButton"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useSnackbar } from "notistack"
import { BASE_URL } from "../config"

export const DeleteBook = () => {
  const [loading, setLoding] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams()

  const handleDeleteBook = () => {
    setLoding(true)

    axios
      .delete(`${BASE_URL}/api/books/${id}`)
      .then(() => {
        enqueueSnackbar('Book deleted successfully', { variant: 'success' })
        navigate(-1)
      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar(`Error: ${err.message}`, { variant: 'error' })
      })
      .finally(() => setLoding(false))
  }

  return (
    <div className="m-4 sm:mx-auto max-w-4xl sm:w-2/3 lg:w-1/2">
      <BackButton />

      <h1 className="text-3xl my-4">Delete Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center border-4 border-sky-400 rounded-xl w-full p-8 mx-auto">
          <h3 className="text-2xl">Are you sure you want to delete this book?</h3>

          <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>
            Yes, delete it
          </button>
        </div>
      )}
    </div>
  )
}