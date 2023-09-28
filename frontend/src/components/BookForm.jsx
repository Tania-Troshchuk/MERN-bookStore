import { Description } from "./Description"

const fields = [
  { title: 'Title', field: 'title' },
  { title: 'Author', field: 'author' },
  { title: 'Publish Year', field: 'publishYear' },
]

export const BookForm = ({ book, handleBookFields, btnText, handleBtnClick, errors }) => {
  return (
    <div className="flex flex-col border-4 border-sky-400 rounded-xl w-full p-8 mx-auto">
      {fields.map(item => (
        <div className="my-2 lg:my-4" key={item.field}>
          <label className="text-xl mr-4 text-gray-500">{item.title}</label>
          <input
            type={item.field === 'publishYear' ? "number" : "text"}
            className={`border-2 ${
              errors[item.field] ? 'border-red-400': 'border-gray-500'
            } rounded-md px-4 py-2 w-full outline-none`}
            value={book[item.field]}
            onChange={e => handleBookFields(item.field, e.target.value)}
          />
          <span className="text-sm text-red-500">{errors[item.field]}</span>
        </div>
      ))}

      <Description
        btnTitle={btnText === 'Save' ? '+Add' : 'Show'}
        description={book.description}
        handleBookFields={handleBookFields}
      />

      <button className="py-2 m-8 bg-sky-300 hover:bg-sky-500 rounded" onClick={handleBtnClick}>
        {btnText}
      </button>
    </div>
  )
}