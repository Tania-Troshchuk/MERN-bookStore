export const BookForm = ({ book, handleBookFields, btnText, handleBtnClick }) => {
  return (
    <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-lg p-4 mx-auto">
    <div className="my-4">
      <label className="text-xl mr-4 text-gray-500">Title</label>
      <input
        type="text"
        className="border-2 border-gray-500 rounded-md px-4 py-2 w-full"
        value={book.title}
        onChange={e => handleBookFields('title', e.target.value)}
      />
    </div>
    
    <div className="my-4">
      <label className="text-xl mr-4 text-gray-500">Author</label>
      <input
        type="text"
        className="border-2 border-gray-500 rounded-md px-4 py-2 w-full"
        value={book.author}
        onChange={e => handleBookFields('author', e.target.value)}
      />
    </div>

    <div className="my-4">
      <label className="text-xl mr-4 text-gray-500">Publish Year</label>
      <input
        type="number"
        className="border-2 border-gray-500 rounded-md px-4 py-2 w-full"
        value={book.publishYear}
        onChange={e => handleBookFields('publishYear', e.target.value)}
      />
    </div>

    <button className="py-2 m-8 bg-sky-300 hover:bg-sky-500" onClick={handleBtnClick}>
      {btnText}
    </button>
  </div>
  )
}