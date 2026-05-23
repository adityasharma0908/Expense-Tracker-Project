function Navbar() {
  return (

    <nav className="bg-gray-800 p-4 flex justify-between items-center">

      <h1 className="text-white text-2xl font-bold">
        Expense Tracker
      </h1>

      <button className="bg-red-500 px-4 py-2 rounded-lg text-white">
        Logout
      </button>

    </nav>

  )
}

export default Navbar