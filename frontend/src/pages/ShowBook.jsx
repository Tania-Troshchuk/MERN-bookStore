import axios from "axios"
import { Spiner } from "../components/Spiner"
import { BackButton } from "../components/BackButton"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export const ShowBook = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)

    axios
      .get(`http://localhost:5050/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="m-4 lg:mx-auto max-w-4xl lg:w-1/2">
      <BackButton />

      <h1 className="text-3xl my-4 mx-auto">Show Book</h1>

      {loading
        ? <Spiner />
        : (
          <div className="flex flex-col border-4 border-sky-400 p-4 mx-auto rounded-xl">
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Id:</span>
              <span>{book._id}</span>
            </div>

            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Title:</span>
              <span>{book.title}</span>
            </div>

            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Author:</span>
              <span>{book.author}</span>
            </div>

            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Publish Year:</span>
              <span>{book.publishYear}</span>
            </div>

            {!!book.description?.length && (
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Description:</span>
                <span>{book.description}</span>
              </div>
            )}

            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Create Time:</span>
              <span>{new Date(book.createdAt).toLocaleTimeString()}</span>
              &nbsp;
              <span>{new Date(book.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Last Updated Time:</span>
              <span>{new Date(book.updatedAt).toLocaleTimeString()}</span>
              &nbsp;
              <span>{new Date(book.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        )}
    </div>
  )
}