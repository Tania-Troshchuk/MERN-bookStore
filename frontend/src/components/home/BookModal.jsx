import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { useEffect } from 'react'

export const BookModal = ({ book, onClose }) => {
  document.body.classList.add('overflow-hidden')

  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[600px] max-w-full min-h-[300px] bg-white rounded-xl p-8 m-4 flex flex-col relative overflow-y-scroll"
        onClick={e => e.stopPropagation()}
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
          {book.publishYear}
        </h2>

        <h4 className="my-2 text-gray-500">{book._id}</h4>

        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1 font-semibold">{book.title}</h2>
        </div>

        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className='my-2'>{book.author}</h2>
        </div>

        <h4 className='my-2 text-gray-600'>{book.description}</h4>
      </div>
    </div>
  )
}