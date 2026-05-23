import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:         #f5f5f0;
    --surface:    #ffffff;
    --surface2:   #f9f9f7;
    --surface3:   #f0f0eb;
    --border:     rgba(0,0,0,0.07);
    --border-hi:  rgba(79,110,242,0.30);
    --accent:     #4f6ef2;
    --accent-dim: rgba(79,110,242,0.08);
    --red:        #d95b5b;
    --red-dim:    rgba(217,91,91,0.08);
    --text:       #1a1a2e;
    --text-2:     #5a5a72;
    --text-3:     #a0a0b8;
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(10px); }
    to   { opacity:1; transform:translateY(0); }
  }

  body {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .profile-page {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    padding-bottom: 60px;
    position: relative;
  }

  /* ── NAV ── */
  .db-nav {
    position: sticky; top: 0; z-index: 50;
    background: rgba(245,245,240,0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    height: 60px; padding: 0 36px;
    display: flex; align-items: center;
    justify-content: space-between;
  }

  .back-btn {
    display: flex; align-items: center; gap: 7px;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-2);
    padding: 8px 14px; border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: border-color .2s, color .2s, background .2s;
  }
  .back-btn:hover { border-color: var(--border-hi); color: var(--accent); background: var(--accent-dim); }

  .logout-btn {
    background: var(--red-dim);
    border: 1px solid rgba(217,91,91,0.18);
    color: var(--red);
    padding: 8px 14px; border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    cursor: pointer;
    transition: background .2s, border-color .2s;
  }
  .logout-btn:hover { background: rgba(217,91,91,0.13); border-color: rgba(217,91,91,0.30); }

  /* ── CONTENT ── */
  .profile-content {
    position: relative; z-index: 1;
    max-width: 860px; margin: 0 auto;
    padding: 36px 36px 0;
  }

  /* ── PAGE HEADER ── */
  .page-header { margin-bottom: 28px; animation: fadeUp .5s ease both; }
  .page-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--text-3); margin-bottom: 6px;
  }
  .page-title { font-size: 22px; font-weight: 600; letter-spacing: -.4px; color: var(--text); }

  /* ── PROFILE CARD ── */
  .profile-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px; padding: 26px;
    display: flex; align-items: center; gap: 20px;
    margin-bottom: 18px;
    animation: fadeUp .5s .06s ease both; opacity:0;
    animation-fill-mode: forwards;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    transition: border-color .2s, box-shadow .2s;
  }
  .profile-card:hover {
    border-color: rgba(79,110,242,0.18);
    box-shadow: 0 4px 12px rgba(0,0,0,0.07);
  }

  .avatar {
    width: 60px; height: 60px; border-radius: 50%;
    background: var(--accent); color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 22px; flex-shrink: 0;
  }
  .profile-name  { font-size: 17px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
  .profile-email {
    font-family: 'DM Mono', monospace;
    font-size: 12px; color: var(--text-3);
  }

  /* ── STATS ── */
  .stats-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 14px; margin-bottom: 18px;
    animation: fadeUp .5s .1s ease both; opacity:0;
    animation-fill-mode: forwards;
  }
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px; padding: 20px 18px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    transition: border-color .2s, box-shadow .2s, transform .2s;
  }
  .stat-card:hover {
    border-color: rgba(79,110,242,0.18);
    box-shadow: 0 4px 12px rgba(0,0,0,0.07);
    transform: translateY(-1px);
  }

  .stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--text-3); margin-bottom: 10px;
  }
  .stat-value { font-size: 24px; font-weight: 600; letter-spacing: -.4px; }
  .stat-value.neutral { color: var(--text); }
  .stat-value.green   { color: #2a8c55; }
  .stat-value.red     { color: var(--red); }

  /* ── TRANSACTIONS ── */
  .tx-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px; padding: 22px;
    animation: fadeUp .5s .14s ease both; opacity:0;
    animation-fill-mode: forwards;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .tx-header {
    display: flex; justify-content: space-between;
    align-items: center; margin-bottom: 16px;
  }
  .tx-title {
    font-size: 15px; font-weight: 600; letter-spacing: -.2px;
    display: flex; align-items: center; gap: 7px;
  }
  .card-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--accent);
    display: inline-block; flex-shrink: 0;
  }
  .tx-count {
    font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-3);
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 99px; padding: 3px 10px;
  }

  .tx-row {
    display: flex; align-items: center; gap: 11px;
    padding: 11px 13px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 9px; margin-bottom: 7px;
    transition: border-color .15s, box-shadow .15s;
  }
  .tx-row:hover {
    border-color: rgba(79,110,242,0.15);
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .tx-icon {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .tx-icon.inc { background: rgba(79,110,242,0.10); color: var(--accent); }
  .tx-icon.exp { background: var(--red-dim); color: var(--red); }

  .tx-info { flex: 1; min-width: 0; }
  .tx-text {
    font-size: 13px; font-weight: 500; color: var(--text);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .tx-type-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px; color: var(--text-3); margin-top: 1px;
    letter-spacing: .5px;
  }
  .tx-amount {
    font-family: 'DM Mono', monospace;
    font-size: 13px; font-weight: 400; flex-shrink: 0;
  }
  .tx-amount.inc { color: #2a8c55; }
  .tx-amount.exp { color: var(--red); }

  .empty {
    text-align: center; color: var(--text-3);
    font-family: 'DM Mono', monospace; font-size: 12px;
    letter-spacing: .8px; padding: 24px 0;
  }

  @media (max-width: 700px) {
    .profile-content { padding: 24px 18px 0; }
    .db-nav { padding: 0 18px; }
    .stats-grid { grid-template-columns: 1fr; }
    .profile-card { flex-direction: column; align-items: flex-start; }
  }
`

const IncomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
)
const ExpenseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="7" x2="7" y2="17"/><polyline points="17 17 7 17 7 7"/>
  </svg>
)

function Profilepage() {
  const navigate = useNavigate()
  
  const user = {
    name: localStorage.getItem("userName") || "User",
    email: localStorage.getItem("userEmail") || "user@email.com"
  }
  const [transactions, setTransactions] = useState([])
  useEffect(() => { fetchTransactions() }, [])

  const fetchTransactions = async () => {
    try {
      const userId = localStorage.getItem("userId")
      console.log("PROFILE USER ID:", userId)
      const r = await API.get(`/api/transactions?user_id=${userId}`)
      console.log("PROFILE TRANSACTIONS:", r.data)
      setTransactions(r.data)
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const income  = transactions.filter(t => t.amount > 0).reduce((a,t) => a + Number(t.amount), 0)
  const expense = transactions.filter(t => t.amount < 0).reduce((a,t) => a + Number(t.amount), 0)
  const balance = income + expense
  const fmt     = n => Number(n || 0).toLocaleString("en-IN")

  return (
    <>
      <style>{styles}</style>
      <div className="profile-page">

        {/* NAV */}
        <nav className="db-nav">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            ← Dashboard
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </nav>

        <div className="profile-content">

          {/* HEADER */}
          <div className="page-header">
            <p className="page-eyebrow">Account</p>
            <h1 className="page-title">Profile</h1>
          </div>

          {/* PROFILE CARD */}
          <div className="profile-card">
            <div className="avatar">{user.name.charAt(0)}</div>
            <div>
              <div className="profile-name">{user.name}</div>
              <div className="profile-email">{user.email}</div>
            </div>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Balance</p>
              <p className={`stat-value ${balance >= 0 ? "green" : "red"}`}>₹{fmt(balance)}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Income</p>
              <p className="stat-value green">₹{fmt(income)}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Expenses</p>
              <p className="stat-value red">₹{fmt(Math.abs(expense))}</p>
            </div>
          </div>

          {/* TRANSACTIONS */}
          <div className="tx-section">
            <div className="tx-header">
              <h2 className="tx-title"><span className="card-dot"/>All Transactions</h2>
              <span className="tx-count">{transactions.length} entries</span>
            </div>

            {transactions.length === 0
              ? <p className="empty">No transactions yet</p>
              : transactions.slice().reverse().map(tx => {
                  const isIncome = tx.amount > 0
                  return (
                    <div key={tx.id} className="tx-row">
                      <div className={`tx-icon ${isIncome ? "inc" : "exp"}`}>
                        {isIncome ? <IncomeIcon/> : <ExpenseIcon/>}
                      </div>
                      <div className="tx-info">
                        <div className="tx-text">{tx.text}</div>
                        <div className="tx-type-label">{isIncome ? "Income" : "Expense"}</div>
                      </div>
                      <span className={`tx-amount ${isIncome ? "inc" : "exp"}`}>
                        {isIncome ? "+" : "−"}₹{fmt(Math.abs(tx.amount))}
                      </span>
                    </div>
                  )
                })
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default Profilepage
