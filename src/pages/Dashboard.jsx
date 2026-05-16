import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import logo from "../assets/logoimage.png"

const s = {
  // LAYOUT
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #050816, #07152f)",
    color: "#f1f0ec",
    padding: "28px",
    fontFamily: "'DM Sans', Arial, sans-serif",
    boxSizing: "border-box",
  },

  // HEADER
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "36px",
  },
  logo: { width: "64px" },
  profilePill: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255,255,255,0.07)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    padding: "10px 16px",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#84cc16",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "16px",
    flexShrink: 0,
  },
  profileName: { fontSize: "14px", fontWeight: 600, color: "#f1f0ec", margin: 0 },
  profileEmail: { fontSize: "12px", color: "#64748b", margin: 0 },

  // OVERVIEW
  overviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "20px",
  },
  overviewCard: {
    background: "rgba(255,255,255,0.05)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "22px",
  },
  overviewLabel: {
    fontSize: "12px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: "0 0 10px",
  },
  overviewAmount: (color) => ({
    fontSize: "30px",
    fontWeight: 700,
    margin: 0,
    color: color === "green" ? "#84cc16" : color === "red" ? "#f87171" : "#f1f0ec",
  }),

  // SECTION GRID
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "22px",
  },
  cardTitle: { fontSize: "16px", fontWeight: 600, color: "#f1f0ec", margin: "0 0 18px" },

  // GOAL
  goalAmount: { fontSize: "22px", fontWeight: 700, color: "#84cc16", margin: "0 0 16px" },
  goalTrack: {
    width: "100%",
    height: "8px",
    background: "#1e293b",
    borderRadius: "20px",
    overflow: "hidden",
  },
  goalFill: (pct) => ({
    width: `${pct}%`,
    height: "100%",
    background: "linear-gradient(to right, #65a30d, #84cc16)",
    borderRadius: "20px",
  }),
  goalMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    fontSize: "12px",
    color: "#64748b",
  },

  // FORM
  typeBtnRow: { display: "flex", gap: "8px", marginBottom: "14px" },
  typeBtn: (active, variant) => ({
    flex: 1,
    padding: "11px",
    border: `0.5px solid ${variant === "income" ? "#4d7c0f" : "#991b1b"}`,
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "14px",
    background: active
      ? variant === "income" ? "#84cc16" : "#ef4444"
      : "transparent",
    color: active
      ? variant === "income" ? "#000" : "#fff"
      : variant === "income" ? "#84cc16" : "#f87171",
    transition: "all 0.15s",
  }),
  input: {
    width: "100%",
    padding: "13px 14px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "0.5px solid rgba(255,255,255,0.1)",
    outline: "none",
    background: "rgba(255,255,255,0.06)",
    color: "#f1f0ec",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  addBtn: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "10px",
    background: "#84cc16",
    color: "#000",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
    transition: "opacity 0.15s",
  },

  // TRANSACTIONS
  txSection: {
    background: "rgba(255,255,255,0.05)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "22px",
  },
  txHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  txTitle: { fontSize: "16px", fontWeight: 600, color: "#f1f0ec", margin: 0 },
  txCount: {
    fontSize: "12px",
    color: "#64748b",
    background: "rgba(255,255,255,0.06)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: "99px",
    padding: "3px 10px",
  },
  txCard: {
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
    padding: "13px 15px",
    marginBottom: "9px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  txIconBox: (type) => ({
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: type === "income" ? "rgba(132,204,22,0.12)" : "rgba(239,68,68,0.12)",
    color: type === "income" ? "#84cc16" : "#f87171",
  }),
  txInfo: { flex: 1, minWidth: 0 },
  txText: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#f1f0ec",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  txAmount: (type) => ({
    fontSize: "14px",
    fontWeight: 600,
    color: type === "income" ? "#84cc16" : "#f87171",
    flexShrink: 0,
  }),
  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "#475569",
    fontSize: "18px",
    cursor: "pointer",
    padding: "0 0 0 10px",
    lineHeight: 1,
    transition: "color 0.15s",
    flexShrink: 0,
  },
  emptyTx: { textAlign: "center", color: "#475569", fontSize: "14px", padding: "24px 0" },

  // DIVIDER + SUMMARY
  divider: { height: "0.5px", background: "rgba(255,255,255,0.07)", margin: "14px 0" },
  summaryRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  summaryBox: {
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.07)",
    borderRadius: "10px",
    padding: "12px 14px",
  },
  summaryLabel: {
    fontSize: "11px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    margin: "0 0 4px",
  },
  summaryValue: (type) => ({
    fontSize: "17px",
    fontWeight: 600,
    margin: 0,
    color: type === "income" ? "#84cc16" : "#f87171",
  }),
}

const IncomeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
)
const ExpenseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="7" x2="7" y2="17" /><polyline points="17 17 7 17 7 7" />
  </svg>
)

function Dashboard() {
  const navigate = useNavigate()

  const user = { name: "Aditya Sharma", email: "aditya@gmail.com" }

  const [transactions, setTransactions] = useState([])
  const [goals, setGoals] = useState([])

const [goalTitle, setGoalTitle] = useState("")
const [goalTarget, setGoalTarget] = useState("")
const [goalSaved, setGoalSaved] = useState("")
  const [text, setText] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("income")
  

useEffect(() => {

  fetchTransactions()
  const fetchGoals = async () => {

  try {

    const response =
      await API.get("/goals")

    setGoals(response.data)

  }

  catch (error) {

    console.log(error)

  }

}

  fetchGoals()

}, [])

  const fetchTransactions = async () => {
    try {
      const response = await API.get("/transactions")
      setTransactions(response.data)
    } catch (error) { console.log(error) }
  }

  const addTransaction = async () => {
    if (!text || !amount) { alert("Fill all fields"); return }
    try {
      await API.post("/transactions", {
        text,
        amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
      })
      setText("")
      setAmount("")
      fetchTransactions()
    } catch (error) { console.log(error) }
  }

  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`)
      fetchTransactions()
    } catch (error) { console.log(error) }
  }
  const addGoal = async () => {

  if (!goalTitle || !goalTarget || !goalSaved) {

    alert("Fill all fields")

    return

  }

  try {

    await API.post("/goals", {

      title: goalTitle,

      target: goalTarget,

      saved: goalSaved

    })

    setGoalTitle("")
    setGoalTarget("")
    setGoalSaved("")

    fetchGoals()

  }

  catch (error) {

    console.log(error)

  }

}
const deleteGoal = async (id) => {

  try {

    await API.delete(`/goals/${id}`)

    fetchGoals()

  }

  catch (error) {

    console.log(error)

  }

}
const updateGoalSavedAmount = async (goal) => {

  const addedAmount =
    prompt("Enter amount to add")

  if (!addedAmount) return

  const updatedSaved =
    Number(goal.saved) +
    Number(addedAmount)

  try {

    await API.put(

      `/goals/${goal.id}`,

      {

        saved: updatedSaved

      }

    )

    fetchGoals()

  }

  catch (error) {

    console.log(error)

  }

}

  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + Number(t.amount), 0)
  const expense = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + Number(t.amount), 0)
  const balance = income + expense

  const savingsCurrent = 20000
  const savingsGoal = 50000
  const savingsPct = Math.round((savingsCurrent / savingsGoal) * 100)

  const fmt = (n) =>
  Number(n || 0).toLocaleString("en-IN")

  return (
    <div style={s.page}>

      {/* HEADER */}
      <div style={s.header}>
        <img src={logo} alt="logo" style={s.logo} />
        <div style={s.profilePill} onClick={() => navigate("/profile")}>
          <div style={s.avatar}>{user.name.charAt(0)}</div>
          <div>
            <p style={s.profileName}>{user.name}</p>
            <p style={s.profileEmail}>{user.email}</p>
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <div style={s.overviewGrid}>
        <div style={s.overviewCard}>
          <p style={s.overviewLabel}>Total Balance</p>
          <p style={s.overviewAmount()}>₹{fmt(balance)}</p>
        </div>
        <div style={s.overviewCard}>
          <p style={s.overviewLabel}>Total Income</p>
          <p style={s.overviewAmount("green")}>₹{fmt(income)}</p>
        </div>
        <div style={s.overviewCard}>
          <p style={s.overviewLabel}>Total Expense</p>
          <p style={s.overviewAmount("red")}>₹{fmt(Math.abs(expense))}</p>
        </div>
      </div>

      {/* SAVINGS GOAL + ADD TRANSACTION */}
      <div style={s.sectionGrid}>

        {/* GOAL TRACKER */}

<div style={s.card}>

  <p style={s.cardTitle}>
    Goal Tracker
  </p>

  {/* GOAL INPUTS */}

  <input
    type="text"
    placeholder="Goal Name"
    style={s.input}
    value={goalTitle}
    onChange={(e) => setGoalTitle(e.target.value)}
  />

  <input
    type="number"
    placeholder="Target Amount"
    style={s.input}
    value={goalTarget}
    onChange={(e) => setGoalTarget(e.target.value)}
  />

  <input
    type="number"
    placeholder="Saved Amount"
    style={s.input}
    value={goalSaved}
    onChange={(e) => setGoalSaved(e.target.value)}
  />

  <button
    style={s.addBtn}
    onClick={addGoal}
  >
    Add Goal
  </button>

  {/* GOALS LIST */}

  <div style={{ marginTop: "20px" }}>

    {
      goals.length === 0

        ?

        <p style={s.emptyTx}>
          No goals yet
        </p>

        :

        goals.map((goal) => {

          const progress =
            Math.min(
              (goal.saved / goal.target) * 100,
              100
            )

          const completed =
            goal.saved >= goal.target

          return (

            <div
              key={goal.id}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                padding: "16px",
                marginBottom: "14px"
              }}
            >

              {/* HEADER */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px"
                }}
              >

                <div>

                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "15px",
                      marginBottom: "4px"
                    }}
                  >
                    {goal.title}
                  </p>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#64748b"
                    }}
                  >
                    ₹{fmt(goal.saved)} / ₹{fmt(goal.target)}
                  </p>

                </div>

                <div
  style={{
    display: "flex",
    gap: "10px",
    alignItems: "center"
  }}
>

  <button
    onClick={() =>
      updateGoalSavedAmount(goal)
    }
    style={{
      background: "#84cc16",
      border: "none",
      color: "black",
      borderRadius: "8px",
      padding: "6px 10px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "600"
    }}
  >
    Edit
  </button>

  <button
    style={s.deleteBtn}
    onClick={() => deleteGoal(goal.id)}
  >
    ×
  </button>

</div>

              </div>

              {/* PROGRESS BAR */}

              <div style={s.goalTrack}>

                <div
                  style={s.goalFill(progress)}
                />

              </div>

              {/* FOOTER */}

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >

                <span
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8"
                  }}
                >
                  {progress.toFixed(0)}% completed
                </span>

                {
                  completed && (
                    <span
                      style={{
                        background: "#84cc16",
                        color: "black",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 700
                      }}
                    >
                      COMPLETED
                    </span>
                  )
                }

              </div>

            </div>

          )

        })

    }

  </div>

</div>

        {/* ADD TRANSACTION */}
        <div style={s.card}>
          <p style={s.cardTitle}>Add Transaction</p>
          <div style={s.typeBtnRow}>
            <button style={s.typeBtn(type === "income", "income")} onClick={() => setType("income")}>
              Income
            </button>
            <button style={s.typeBtn(type === "expense", "expense")} onClick={() => setType("expense")}>
              Expense
            </button>
          </div>
          <input
            type="text"
            placeholder="Description"
            style={s.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            style={s.input}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button style={s.addBtn} onClick={addTransaction}>
            Add Transaction
          </button>
        </div>

      </div>

      {/* RECENT TRANSACTIONS */}
      <div style={s.txSection}>
        <div style={s.txHeader}>
          <h2 style={s.txTitle}>Recent Transactions</h2>
          <span style={s.txCount}>{transactions.length} entries</span>
        </div>

        {transactions.length === 0 ? (
          <p style={s.emptyTx}>No transactions yet</p>
        ) : (
          <>
            {[...transactions].reverse().map((tx) => {
              const isIncome = tx.amount > 0
              const txType = isIncome ? "income" : "expense"
              return (
                <div key={tx.id} style={s.txCard}>
                  <div style={s.txIconBox(txType)}>
                    {isIncome ? <IncomeIcon /> : <ExpenseIcon />}
                  </div>
                  <div style={s.txInfo}>
                    <p style={s.txText}>{tx.text}</p>
                  </div>
                  <span style={s.txAmount(txType)}>
                    {isIncome ? "+" : "−"}₹{fmt(Math.abs(tx.amount))}
                  </span>
                  <button
                    style={s.deleteBtn}
                    onClick={() => deleteTransaction(tx.id)}
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
              )
            })}

            <div style={s.divider} />

            <div style={s.summaryRow}>
              <div style={s.summaryBox}>
                <p style={s.summaryLabel}>Total income</p>
                <p style={s.summaryValue("income")}>+₹{fmt(income)}</p>
              </div>
              <div style={s.summaryBox}>
                <p style={s.summaryLabel}>Total expenses</p>
                <p style={s.summaryValue("expense")}>−₹{fmt(Math.abs(expense))}</p>
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  )
}

export default Dashboard
