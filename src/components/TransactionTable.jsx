function TransactionTable() {

  const transactions = [
    {
      id: 1,
      text: "Food",
      amount: -500
    },
    {
      id: 2,
      text: "Salary",
      amount: 10000
    }
  ]

  return (

    <div className="bg-gray-800 p-6 rounded-xl">

      <h2 className="text-2xl text-white mb-4">
        Transactions
      </h2>

      {
        transactions.map((transaction) => (

          <div
            key={transaction.id}
            className="flex justify-between bg-gray-700 p-4 rounded-lg mb-3 text-white"
          >

            <p>
              {transaction.text}
            </p>

            <p>
              ₹{transaction.amount}
            </p>

          </div>

        ))
      }

    </div>

  )
}

export default TransactionTable