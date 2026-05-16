function AddTransactionModal() {

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-2xl mb-4">
          Add Transaction
        </h2>

        <input
          type="text"
          placeholder="Description"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
          Add
        </button>

      </div>

    </div>

  )
}

export default AddTransactionModal