import axios from "axios"
import { Spiner } from "../components/Spiner"
import { BackButton } from "../components/BackButton"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useSnackbar } from "notistack"

export const DeleteBook = () => {
  const [loading, setLoding] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams()

  const handleDeleteBook = () => {
    setLoding(true)

    axios
      .delete(`http://localhost:5050/api/books/${id}`)
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
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl my-4">Delete Book</h1>

      {loading ? (
        <Spiner />
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">Are you sure you want to delete this book?</h3>

          <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>
            Yes, delete it
          </button>
        </div>
      )}
    </div>
  )
}