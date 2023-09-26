import { useState } from "react"

export const Description = ({ btnTitle, description, handleBookFields }) => {
  const [showText, setShowText] = useState(false)
  const maxLength = 500

  return (
    <div>
      <button
        onClick={() => setShowText(!showText)}
        className="border-2 border-gray-500 rounded-md px-4 py-2 bg-slate-200 hover:bg-slate-300 text-gray-600"
      >
        {showText ? 'Hide description' : `${btnTitle} description`}
      </button>

      {showText && (
        <>
          <textarea
            className="border-2 border-gray-500 rounded-md px-4 py-2 mt-4 resize-none w-full outline-none"
            rows="7"
            maxLength={maxLength}
            placeholder="Not provided yet..."
            value={description ?? ''}
            onChange={e => handleBookFields('description', e.target.value)}
          />

          <div className="text-gray-400 text-sm text-end">
            {`${description?.length ?? 0}/${maxLength}`}
          </div>
        </>
      )}

    </div>
  )
}