const fields = [
  { title: 'Title', field: 'title' },
  { title: 'Author', field: 'author' },
  { title: 'Publish Year', field: 'publishYear' },
]

export const BookForm = ({ book, handleBookFields, btnText, handleBtnClick }) => {
  return (
    <div className="flex flex-col border-4 border-sky-400 rounded-xl w-full max-w-lg p-4 mx-auto">
      {fields.map(item => (
        <div className="my-4" key={item.field}>
          <label className="text-xl mr-4 text-gray-500">{item.title}</label>
          <input
            type="text"
            className="border-2 border-gray-500 rounded-md px-4 py-2 w-full"
            value={book[item.field]}
            onChange={e => handleBookFields(item.field, e.target.value)}
          />
        </div>
      ))}

      <button className="py-2 m-8 bg-sky-300 hover:bg-sky-500" onClick={handleBtnClick}>
        {btnText}
      </button>
    </div>
  )
}