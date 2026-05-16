function Sidebar() {

  return (

    <div className="w-64 min-h-screen bg-gray-800 p-6">

      <h2 className="text-white text-2xl font-bold mb-8">
        Menu
      </h2>

      <ul className="space-y-4 text-white">

        <li className="hover:text-blue-400 cursor-pointer">
          Dashboard
        </li>

        <li className="hover:text-blue-400 cursor-pointer">
          Transactions
        </li>

        <li className="hover:text-blue-400 cursor-pointer">
          Goals
        </li>

        <li className="hover:text-blue-400 cursor-pointer">
          Profile
        </li>

      </ul>

    </div>

  )
}

export default Sidebar