import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import API from "../services/api"

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #050816;
    font-family: Arial, sans-serif;
  }

  .profile-page {
    min-height: 100vh;
    background: linear-gradient(to bottom, #050816, #07152f);
    color: white;
    padding: 30px;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  .back-btn {
    background: rgba(255,255,255,0.08);
    border: none;
    color: white;
    padding: 12px 20px;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.2s;
  }

  .back-btn:hover {
    background: rgba(255,255,255,0.14);
  }

  .logout-btn {
    background: #ef4444;
    border: none;
    color: white;
    padding: 12px 20px;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.2s;
  }

  .logout-btn:hover {
    opacity: 0.9;
  }

  .profile-card {
    background: rgba(255,255,255,0.06);
    border-radius: 24px;
    padding: 30px;
    margin-bottom: 30px;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #84cc16;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .profile-name {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .profile-email {
    color: #94a3b8;
    font-size: 16px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }

  .stat-card {
    background: rgba(255,255,255,0.06);
    border-radius: 20px;
    padding: 24px;
  }

  .stat-title {
    color: #94a3b8;
    margin-bottom: 10px;
  }

  .stat-value {
    font-size: 32px;
    font-weight: bold;
  }

  .green {
    color: #84cc16;
  }

  .red {
    color: #ef4444;
  }

  .transactions-card {
    background: rgba(255,255,255,0.06);
    border-radius: 24px;
    padding: 30px;
  }

  .transactions-title {
    margin-bottom: 20px;
    font-size: 26px;
  }

  .transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255,255,255,0.05);
    padding: 16px;
    border-radius: 14px;
    margin-top: 12px;
  }

  .tx-left {
    display: flex;
    flex-direction: column;
  }

  .tx-text {
    font-size: 16px;
    font-weight: bold;
  }

  .tx-type {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 4px;
  }

  .tx-amount {
    font-size: 18px;
    font-weight: bold;
  }

  .empty {
    color: #94a3b8;
    margin-top: 20px;
  }

  @media (max-width: 900px) {

    .stats-grid {
      grid-template-columns: 1fr;
    }

  }
`

function Profilepage() {

  const navigate = useNavigate()

  const [transactions, setTransactions] = useState([])

  const user = {
    name: "Aditya Sharma",
    email: "aditya@gmail.com"
  }

  useEffect(() => {

    fetchTransactions()

  }, [])

  const fetchTransactions = async () => {

    try {

      const response =
        await API.get("/transactions")

      setTransactions(response.data)

    }

    catch (error) {

      console.log(error)

    }

  }

  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/")

  }

  const income =
    transactions
      .filter(t => t.amount > 0)
      .reduce((acc, t) => acc + Number(t.amount), 0)

  const expense =
    transactions
      .filter(t => t.amount < 0)
      .reduce((acc, t) => acc + Number(t.amount), 0)

  const balance =
    income + expense

  return (

    <>
      <style>{styles}</style>

      <div className="profile-page">

        {/* TOP BAR */}

        <div className="top-bar">

          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* PROFILE CARD */}

        <div className="profile-card">

          <div className="avatar">
            {user.name.charAt(0)}
          </div>

          <div className="profile-name">
            {user.name}
          </div>

          <div className="profile-email">
            {user.email}
          </div>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-title">
              Total Balance
            </div>

            <div className="stat-value">
              ₹{balance}
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-title">
              Total Income
            </div>

            <div className="stat-value green">
              ₹{income}
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-title">
              Total Expense
            </div>

            <div className="stat-value red">
              ₹{Math.abs(expense)}
            </div>

          </div>

        </div>

        {/* ALL TRANSACTIONS */}

        <div className="transactions-card">

          <h2 className="transactions-title">
            All Transactions
          </h2>

          {

            transactions.length === 0

              ?

              <div className="empty">
                No transactions found
              </div>

              :

              transactions
                .slice()
                .reverse()
                .map((transaction) => (

                  <div
                    className="transaction-item"
                    key={transaction.id}
                  >

                    <div className="tx-left">

                      <div className="tx-text">
                        {transaction.text}
                      </div>

                      <div className="tx-type">

                        {
                          transaction.amount > 0
                            ? "Income"
                            : "Expense"
                        }

                      </div>

                    </div>

                    <div
                      className={`tx-amount ${
                        transaction.amount > 0
                          ? "green"
                          : "red"
                      }`}
                    >

                      ₹{transaction.amount}

                    </div>

                  </div>

                ))

          }

        </div>

      </div>

    </>

  )

}

export default Profilepage