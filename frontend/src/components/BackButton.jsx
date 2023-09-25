import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

export const BackButton = () => {
  return (
    <div className="flex">
      <Link to={-1} className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit hover:bg-sky-600">
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  )
}