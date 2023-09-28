import { useEffect, useState } from "react"
import axios from 'axios'
import { Spinner } from "../components/Spinner"
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import { BooksTable } from "../components/home/BooksTable"
import { BooksCard } from "../components/home/BooksCard"
import { BASE_URL } from "../config"

export const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setLoading(true)

    axios
      .get(`${BASE_URL}/api/books`)
      .then(res => setBooks(res.data.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="m-4">
      <div className="flex justify-center items-center gap-x-4">
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? 'bg-sky-500 border-2 border-gray-500' : 'bg-sky-300'} hover:bg-sky-600 px-4 py-1 rounded-lg`
          }
        >
          Table
        </NavLink>

        <NavLink
          to="/cards"
          className={({ isActive }) => `${isActive ? 'bg-sky-500 border-2 border-gray-500' : 'bg-sky-300'} hover:bg-sky-600 px-4 py-1 rounded-lg`
          }
        >
          Card
        </NavLink>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 mx-4">Books List</h1>

        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl mx-4" />
        </Link>
      </div>

      {
        loading
          ? <Spinner />
          : pathname === '/' ? <BooksTable books={books} /> : <BooksCard books={books} />
      }

      {!loading && !books.length && (
        <span className="text-xl mx-4">Books List is empty.</span>
      )}
    </div>
  )
}