export const Spinner = () => {
  return(
    <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="w-16 h-16 rounded-full bg-sky-600 animate-ping"></div>
    </div>
  )
}