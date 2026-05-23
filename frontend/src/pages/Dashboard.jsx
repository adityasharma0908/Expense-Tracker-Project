import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import logo from "../assets/logoimage.png"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
  @keyframes progressFill {
    from { width:0%; }
  }

  body {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .db-page {
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
  .nav-brand { display:flex; align-items:center; gap:9px; }
  .nav-brand img {
    width: 28px; height: 28px; object-fit: contain;
  }
  .nav-brand-name {
    font-size: 15px; font-weight: 600; letter-spacing: -.2px;
    color: var(--text);
  }

  .profile-pill {
    display: flex; align-items: center; gap: 9px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 6px 12px 6px 7px;
    border-radius: 100px; cursor: pointer;
    transition: border-color .2s, background .2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .profile-pill:hover { border-color: var(--border-hi); }

  .avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: var(--accent); color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 13px; flex-shrink: 0;
  }
  .profile-name  { font-size: 13px; font-weight: 500; color: var(--text); line-height:1.2; }
  .profile-email {
    font-size: 11px; font-family: 'DM Mono', monospace;
    color: var(--text-3); line-height:1.2;
  }

  /* ── CONTENT ── */
  .db-content {
    position: relative; z-index: 1;
    max-width: 1120px; margin: 0 auto;
    padding: 36px 36px 0;
  }

  /* ── PAGE HEADER ── */
  .page-header { margin-bottom: 28px; animation: fadeUp .5s ease both; }
  .page-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--text-3); margin-bottom: 6px;
  }
  .page-title {
    font-size: 22px; font-weight: 600; letter-spacing: -.4px; color: var(--text);
  }

  /* ── OVERVIEW ── */
  .overview-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 14px; margin-bottom: 20px;
    animation: fadeUp .5s .06s ease both; opacity:0;
    animation-fill-mode: forwards;
  }
  .overview-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px; padding: 20px 18px;
    position: relative; overflow: hidden;
    transition: border-color .2s, box-shadow .2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .overview-card:hover {
    border-color: rgba(79,110,242,0.18);
    box-shadow: 0 4px 12px rgba(0,0,0,0.07);
  }

  .ov-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--text-3); margin-bottom: 10px;
  }
  .ov-amount {
    font-size: 26px; font-weight: 600; letter-spacing: -.5px;
  }
  .ov-amount.neutral { color: var(--text); }
  .ov-amount.green   { color: #2a8c55; }
  .ov-amount.red     { color: var(--red); }

  /* ── SECTION GRID ── */
  .section-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 14px; margin-bottom: 20px;
  }

  /* ── CARD ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px; padding: 22px;
    animation: fadeUp .5s .12s ease both; opacity:0;
    animation-fill-mode: forwards;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .card-title {
    font-size: 15px; font-weight: 600; letter-spacing: -.2px;
    color: var(--text); margin-bottom: 18px;
    display: flex; align-items: center; gap: 7px;
  }
  .card-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  /* ── INPUTS ── */
  .field-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 1.2px; text-transform: uppercase;
    color: var(--text-2); margin-bottom: 5px; display: block;
  }
  .styled-input {
    width: 100%; padding: 10px 13px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 9px; color: var(--text);
    font-family: 'DM Mono', monospace; font-size: 13px;
    outline: none; margin-bottom: 11px;
    transition: border-color .2s, background .2s, box-shadow .2s;
  }
  .styled-input::placeholder { color: var(--text-3); }
  .styled-input:hover { background: var(--surface3); border-color: rgba(0,0,0,0.12); }
  .styled-input:focus {
    background: #fff;
    border-color: var(--border-hi);
    box-shadow: 0 0 0 3px var(--accent-dim);
  }

  /* ── TYPE TOGGLE ── */
  .type-toggle {
    display: flex; gap: 6px; margin-bottom: 14px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 9px; padding: 3px;
  }
  .type-btn {
    flex: 1; padding: 9px;
    border: none; border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all .18s;
  }
  .type-btn.income-active  { background: var(--accent); color: #fff; }
  .type-btn.expense-active { background: var(--red);    color: #fff; }
  .type-btn.inactive       { background: transparent;   color: var(--text-3); }
  .type-btn.inactive:hover { color: var(--text-2); }

  /* ── PRIMARY BUTTON ── */
  .primary-btn {
    width: 100%; padding: 12px;
    background: var(--accent); color: #fff;
    border: none; border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    cursor: pointer;
    transition: all .18s ease;
    box-shadow: 0 2px 8px rgba(79,110,242,0.20);
  }
  .primary-btn:hover {
    background: #3d5ae0;
    box-shadow: 0 4px 14px rgba(79,110,242,0.28);
    transform: translateY(-1px);
  }
  .primary-btn:active { transform:translateY(0); box-shadow: 0 2px 6px rgba(79,110,242,0.18); }

  /* ── GOAL CARDS ── */
  .goal-list { margin-top: 18px; display:flex; flex-direction:column; gap:10px; }

  .goal-card {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 11px; padding: 14px;
    transition: border-color .2s, box-shadow .2s;
  }
  .goal-card:hover {
    border-color: rgba(79,110,242,0.18);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .goal-card-header {
    display: flex; justify-content: space-between;
    align-items: flex-start; margin-bottom: 10px;
  }
  .goal-name  { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 2px; }
  .goal-amts  { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-3); }
  .goal-actions { display:flex; gap:5px; align-items:center; }

  .edit-btn {
    background: var(--accent-dim);
    border: 1px solid rgba(79,110,242,0.18);
    color: var(--accent);
    border-radius: 6px; padding: 4px 9px;
    font-family: 'DM Mono', monospace;
    font-size: 10px; font-weight: 500;
    letter-spacing: .8px; cursor: pointer;
    transition: background .15s;
  }
  .edit-btn:hover { background: rgba(79,110,242,0.14); }

  .del-btn {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-3);
    border-radius: 6px; width: 26px; height: 26px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; cursor: pointer; transition: all .15s; flex-shrink:0;
  }
  .del-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-dim); }

  .progress-track {
    width:100%; height:4px;
    background: var(--surface3); border-radius:99px; overflow:hidden;
  }
  .progress-fill {
    height:100%; border-radius:99px;
    background: linear-gradient(90deg, #7a9af0, var(--accent));
    animation: progressFill .7s ease both;
    transition: width .4s ease;
  }
  .progress-fill.full { background: linear-gradient(90deg, #2a8c55, #4ab87a); }

  .goal-footer {
    display:flex; justify-content:space-between;
    align-items:center; margin-top:7px;
  }
  .progress-pct {
    font-family:'DM Mono',monospace; font-size:10px; color:var(--text-3);
  }
  .completed-badge {
    background: #e6f4ec; color: #2a8c55;
    padding: 2px 8px; border-radius:99px;
    font-family:'DM Mono',monospace; font-size:10px; font-weight:600;
    letter-spacing:.8px; text-transform:uppercase;
    border: 1px solid rgba(42,140,85,0.2);
  }

  /* ── TRANSACTIONS ── */
  .tx-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px; padding: 22px;
    animation: fadeUp .5s .18s ease both; opacity:0;
    animation-fill-mode: forwards;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .tx-header {
    display:flex; justify-content:space-between;
    align-items:center; margin-bottom:16px; gap: 10px;
  }
  .tx-title {
    font-size: 15px; font-weight: 600; letter-spacing:-.2px;
    display:flex; align-items:center; gap:7px;
  }
  .tx-count {
    font-family:'DM Mono',monospace; font-size:11px; color:var(--text-3);
    background:var(--surface2); border:1px solid var(--border);
    border-radius:99px; padding:3px 10px;
  }

  .tx-row {
    display:flex; align-items:center; gap:11px;
    padding:11px 13px;
    background:var(--surface2);
    border:1px solid var(--border);
    border-radius:9px; margin-bottom:7px;
    transition: border-color .15s, box-shadow .15s;
  }
  .tx-row:hover {
    border-color: rgba(79,110,242,0.15);
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .tx-icon {
    width:32px; height:32px; border-radius:8px;
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .tx-icon.inc { background: rgba(79,110,242,0.10); color: var(--accent); }
  .tx-icon.exp { background: var(--red-dim); color: var(--red); }

  .tx-desc {
    flex:1; min-width:0;
    font-size:13px; font-weight:500; color:var(--text);
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }
  .tx-amount {
    font-family:'DM Mono',monospace; font-size:13px; font-weight:400; flex-shrink:0;
  }
  .tx-amount.inc { color: #2a8c55; }
  .tx-amount.exp { color: var(--red); }

  /* ── SUMMARY ── */
  .divider { height:1px; background:var(--border); margin:14px 0; }
  .summary-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .summary-box {
    background:var(--surface2); border:1px solid var(--border);
    border-radius:9px; padding:12px 14px;
  }
  .summary-label {
    font-family:'DM Mono',monospace; font-size:10px; letter-spacing:1.2px;
    text-transform:uppercase; color:var(--text-3); margin-bottom:5px;
  }
  .summary-value { font-size:18px; font-weight:600; }
  .summary-value.inc { color: #2a8c55; }
  .summary-value.exp { color: var(--red); }

  .empty {
    text-align:center; color:var(--text-3);
    font-family:'DM Mono',monospace; font-size:12px;
    letter-spacing:.8px; padding:24px 0;
  }

  /* ── RESPONSIVE ── */
  @media (max-width:860px) {
    .db-content { padding:24px 18px 0; }
    .db-nav { padding:0 18px; }
    .overview-grid { grid-template-columns:1fr 1fr; }
    .section-grid  { grid-template-columns:1fr; }
  }
  @media (max-width:520px) {
    .overview-grid { grid-template-columns:1fr; }
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

function Dashboard() {
  
  const navigate = useNavigate()
  const user = { name: localStorage.getItem("userName"), email: localStorage.getItem("userEmail") }
  const userId = localStorage.getItem("userId")

  const [transactions, setTransactions] = useState([])
  const [goals, setGoals]               = useState([])
  const [goalTitle, setGoalTitle]       = useState("")
  const [goalTarget, setGoalTarget]     = useState("")
  const [goalSaved, setGoalSaved]       = useState("")
  const [text, setText]                 = useState("")
  const [amount, setAmount]             = useState("")
  const [type, setType]                 = useState("income")
  const [category, setCategory]         = useState("Food")
  const [filterCategory, setFilterCategory] = useState("All")

  useEffect(() => { fetchTransactions(); fetchGoals() }, [])

  const fetchTransactions = async () => {
    try { const r = await API.get(`/transactions?user_id=${localStorage.getItem("userId")}`); setTransactions(r.data) }
    catch (e) { console.log(e) }
  }
  const fetchGoals = async () => {
    try { const r = await API.get(`/goals?user_id=${localStorage.getItem("userId")}`); 
setGoals(r.data) }
    catch (e) { console.log(e) }
  }

  const addTransaction = async () => {
    toast.success("Transaction added")
    if (!text || !amount) { alert("Fill all fields"); return }
    try {
      await API.post("/transactions", {
        text, amount,
        amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
        category,
        user_id: localStorage.getItem("userId")
      })
      setText(""); setAmount(""); fetchTransactions()
    } catch (e) { toast.error("Something went wrong")
console.log(e)}
  }

  const deleteTransaction = async (id) => {
    try { await API.delete(`/transactions/${id}`); fetchTransactions() }
    catch (e) { toast.error("Something went wrong")
console.log(e) }
    toast.error("Transaction deleted")
  }

  const addGoal = async () => {
    if (!goalTitle || !goalTarget || !goalSaved) { alert("Fill all fields"); return }
    try {
      await API.post("/goals", { title: goalTitle, target: goalTarget, saved: goalSaved, user_id: localStorage.getItem("userId")})
      setGoalTitle(""); setGoalTarget(""); setGoalSaved(""); fetchGoals()
      toast.success("Goal added")
    } catch (e) { toast.error("Something went wrong")
console.log(e) }
  }

  const deleteGoal = async (id) => {
    if (!window.confirm("Delete this goal?")) return
    try { await API.delete(`/goals/${id}`); setGoals(goals.filter(g => g.id !== id)) }
    catch (e) { toast.error("Something went wrong")
toast.error("Goal deleted")}
  }

  const updateGoalSavedAmount = async (goal) => {
    const added = prompt("Enter amount to add")
    if (!added || isNaN(added)) return
    const updatedSaved = Number(goal.saved_amount) + Number(added)
    try {
      await API.put(`/goals/${goal.id}`, { saved: updatedSaved })
      setGoals(prev => prev.map(g =>
        g.id === goal.id ? { ...g, saved_amount: updatedSaved, target_amount: Number(g.target_amount) } : g
      ))
    } catch (e) { toast.error("Something went wrong")
console.log(e) }
    if (updatedSaved >= goal.target_amount) {
      toast.success(`${goal.title} completed 🎉`)
    }
  }

  const income  = transactions.filter(t => t.amount > 0).reduce((a,t) => a + Number(t.amount), 0)
  const expense = transactions.filter(t => t.amount < 0).reduce((a,t) => a + Number(t.amount), 0)
  const balance = income + expense
  const isOverspending = Math.abs(expense) > income
  const spendingPercentage = income > 0 ? (Math.abs(expense) / income) * 100 : 0
  const fmt = n => Number(n || 0).toLocaleString("en-IN")

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text("Expense Tracker Report", 14, 15)
    autoTable(doc, {
      startY: 25,
      head: [["Description", "Category", "Amount"]],
      body: transactions.map(tx => [tx.text, tx.category, tx.amount])
    })
    doc.save("transactions.pdf")
  }

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions")
    XLSX.writeFile(workbook, "transactions.xlsx")
  }

  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions)
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet)
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "transactions.csv")
  }

  const analyticsData = [
    { name: "Income", value: income },
    { name: "Expense", value: Math.abs(expense) }
  ]

  const categoryTotals = {}
  transactions.forEach(tx => {
    if (tx.amount < 0) {
      const category = tx.category || "Other"
      categoryTotals[category] = (categoryTotals[category] || 0) + Math.abs(tx.amount)
    }
  })

  const monthlyData = [
    { month: "Jan", income: 12000, expense: 8000 },
    { month: "Feb", income: 15000, expense: 6000 },
    { month: "Mar", income: 18000, expense: 9000 },
    { month: "Apr", income: 14000, expense: 7000 },
    { month: "May", income: income, expense: Math.abs(expense) },
  ]

  const COLORS = ["#4f6ef2", "#d95b5b"]

  const filteredTransactions =
    filterCategory === "All"
      ? transactions
      : transactions.filter(tx => tx.category === filterCategory)

  let highestCategory = null
  let highestAmount = 0
  for (const category in categoryTotals) {
    if (categoryTotals[category] > highestAmount) {
      highestAmount = categoryTotals[category]
      highestCategory = category
    }
  }

  const aiInsights = []
  if (highestCategory) aiInsights.push(`Your highest spending is on ${highestCategory}.`)
  if (Math.abs(expense) > income) aiInsights.push("You are currently overspending.")
  if (income > 0 && Math.abs(expense) / income < 0.5) aiInsights.push("Excellent savings rate this month.")
  if (income > 0 && Math.abs(expense) / income > 0.8) aiInsights.push("Your expenses are close to your income.")

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <style>{styles}</style>
      <div className="db-page">

        {/* NAV */}
        <nav className="db-nav">
          <div className="nav-brand">
            <img src={logo} alt="logo"/>
            <span className="nav-brand-name">ExpenseTracker</span>
          </div>
          <div className="profile-pill" onClick={() => navigate("/profile")}>
            <div className="avatar">{user.name.charAt(0)}</div>
            <div>
              <div className="profile-name">{user.name}</div>
              <div className="profile-email">{user.email}</div>
            </div>
          </div>
        </nav>

        <div className="db-content">

          {/* HEADER */}
          <div className="page-header">
            <p className="page-eyebrow">Financial Overview</p>
            <h1 className="page-title">Dashboard</h1>
          </div>

          {/* OVERVIEW */}
          <div className="overview-grid">
            <div className="overview-card">
              <p className="ov-label">Balance</p>
              <p className={`ov-amount ${balance >= 0 ? "green" : "red"}`}>₹{fmt(balance)}</p>
            </div>
            <div className="overview-card">
              <p className="ov-label">Income</p>
              <p className="ov-amount green">₹{fmt(income)}</p>
            </div>
            <div className="overview-card">
              <p className="ov-label">Expenses</p>
              <p className="ov-amount red">₹{fmt(Math.abs(expense))}</p>
            </div>
          </div>

          {/* OVERSPENDING ALERT */}
          {isOverspending && (
            <div style={{
              background: "rgba(217,91,91,0.06)",
              border: "1px solid rgba(217,91,91,0.18)",
              borderRadius: "14px",
              padding: "18px",
              marginBottom: "20px",
              color: "#b94040",
              animation: "fadeUp .4s ease"
            }}>
              <div style={{ fontSize: "15px", fontWeight: "600", marginBottom: "6px" }}>
                ⚠ Overspending Alert
              </div>
              <div style={{ fontSize: "14px", color: "#c75555" }}>
                Your expenses are higher than your income. Try reducing unnecessary spending.
              </div>
            </div>
          )}

          {!isOverspending && spendingPercentage >= 80 && (
            <div style={{
              background: "rgba(186,117,23,0.06)",
              border: "1px solid rgba(186,117,23,0.18)",
              borderRadius: "14px",
              padding: "18px",
              marginBottom: "20px",
              color: "#7a4e0a"
            }}>
              <div style={{ fontSize: "15px", fontWeight: "600", marginBottom: "6px" }}>
                ⚡ High Spending Warning
              </div>
              <div style={{ fontSize: "14px", color: "#9a6415" }}>
                You have used {spendingPercentage.toFixed(0)}% of your income.
              </div>
            </div>
          )}

          {/* GOAL + TRANSACTION */}
          <div className="section-grid">

            {/* GOAL TRACKER */}
            <div className="card">
              <div className="card-title"><span className="card-dot"/>Goal Tracker</div>

              <label className="field-label">Goal name</label>
              <input type="text" placeholder="e.g. Emergency Fund" className="styled-input"
                value={goalTitle} onChange={e => setGoalTitle(e.target.value)}/>

              <label className="field-label">Target (₹)</label>
              <input type="number" placeholder="100000" className="styled-input"
                value={goalTarget} onChange={e => setGoalTarget(e.target.value)}/>

              <label className="field-label">Saved (₹)</label>
              <input type="number" placeholder="25000" className="styled-input"
                value={goalSaved} onChange={e => setGoalSaved(e.target.value)}/>

              <button className="primary-btn" onClick={addGoal}>Add Goal</button>

              <div className="goal-list">
                {goals.length === 0
                  ? <p className="empty">No goals yet</p>
                  : goals.map(goal => {
                      const saved    = Number(goal.saved_amount || 0)
                      const target   = Number(goal.target_amount || 0)
                      const progress = Math.min(target > 0 ? (saved / target) * 100 : 0, 100)
                      const done     = target > 0 && saved >= target
                      return (
                        <div key={goal.id} className="goal-card">
                          <div className="goal-card-header">
                            <div>
                              <div className="goal-name">{goal.title}</div>
                              <div className="goal-amts">₹{fmt(goal.saved_amount)} / ₹{fmt(goal.target_amount)}</div>
                            </div>
                            <div className="goal-actions">
                              <button className="edit-btn" onClick={() => updateGoalSavedAmount(goal)}>+ Add</button>
                              <button className="del-btn"  onClick={() => deleteGoal(goal.id)}>×</button>
                            </div>
                          </div>
                          <div className="progress-track">
                            <div className={`progress-fill${done ? " full" : ""}`} style={{ width:`${progress}%` }}/>
                          </div>
                          <div className="goal-footer">
                            <span className="progress-pct">{progress.toFixed(0)}% complete</span>
                            {done && <span className="completed-badge">Done</span>}
                          </div>
                        </div>
                      )
                    })
                }
              </div>
            </div>

            {/* ADD TRANSACTION */}
            <div className="card">
              <div className="card-title"><span className="card-dot"/>Add Transaction</div>

              <div className="type-toggle">
                <button className={`type-btn ${type==="income"  ? "income-active"  : "inactive"}`} onClick={() => setType("income")}>↑ Income</button>
                <button className={`type-btn ${type==="expense" ? "expense-active" : "inactive"}`} onClick={() => setType("expense")}>↓ Expense</button>
              </div>

              <label className="field-label">Description</label>
              <input type="text" placeholder="e.g. Groceries, Salary…" className="styled-input"
                value={text} onChange={e => setText(e.target.value)}/>

              <label className="field-label">Category</label>
              <select className="styled-input" value={category} onChange={e => setCategory(e.target.value)}>
                <option>Food</option>
                <option>Salary</option>
                <option>Shopping</option>
                <option>Transport</option>
                <option>Bills</option>
                <option>Entertainment</option>
                <option>Health</option>
                <option>Other</option>
              </select>

              <label className="field-label">Amount (₹)</label>
              <input type="number" placeholder="Enter amount" className="styled-input"
                value={amount} onChange={e => setAmount(e.target.value)}/>

              <button className="primary-btn" onClick={addTransaction}>Add Transaction</button>
            </div>

          </div>

          {/* TRANSACTIONS */}
          <div className="tx-section">
            <div className="tx-header">
              <h2 className="tx-title"><span className="card-dot"/>Recent Transactions</h2>
              <select
                className="styled-input"
                style={{ width: "160px", marginBottom: "0" }}
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Salary">Salary</option>
                <option value="Shopping">Shopping</option>
                <option value="Transport">Transport</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
              <span className="tx-count">{transactions.length} entries</span>
            </div>

            {transactions.length === 0
              ? <p className="empty">No transactions yet</p>
              : <>
                  {[...filteredTransactions].reverse().map(tx => {
                    const isIncome = tx.amount > 0
                    return (
                      <div key={tx.id} className="tx-row">
                        <div className={`tx-icon ${isIncome ? "inc" : "exp"}`}>
                          {isIncome ? <IncomeIcon/> : <ExpenseIcon/>}
                        </div>
                        <p style={{ fontSize: "12px", color: "var(--text-3)", marginTop: "3px" }}>
                          {tx.category}
                        </p>
                        <span className="tx-desc">{tx.text}</span>
                        <span className={`tx-amount ${isIncome ? "inc" : "exp"}`}>
                          {isIncome ? "+" : "−"}₹{fmt(Math.abs(tx.amount))}
                        </span>
                        <button className="del-btn" onClick={() => deleteTransaction(tx.id)}>×</button>
                      </div>
                    )
                  })}
                  <div className="divider"/>
                  <div className="summary-grid">
                    <div className="summary-box">
                      <p className="summary-label">Total income</p>
                      <p className="summary-value inc">+₹{fmt(income)}</p>
                    </div>
                    <div className="summary-box">
                      <p className="summary-label">Total expenses</p>
                      <p className="summary-value exp">−₹{fmt(Math.abs(expense))}</p>
                    </div>
                  </div>
                </>
            }
          </div>

          {/* EXPORT BUTTONS */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
            <button className="primary-btn" style={{ width: "auto", padding: "10px 18px" }} onClick={exportPDF}>
              Export PDF
            </button>
            <button className="primary-btn" style={{ width: "auto", padding: "10px 18px" }} onClick={exportExcel}>
              Export Excel
            </button>
            <button className="primary-btn" style={{ width: "auto", padding: "10px 18px" }} onClick={exportCSV}>
              Export CSV
            </button>
          </div>

          {/* AI INSIGHTS */}
          <div className="card" style={{ marginBottom: "20px" }}>
            <div className="card-title">
              <span className="card-dot"/>
              AI Insights
            </div>
            {aiInsights.length === 0
              ? <p className="empty">No insights yet</p>
              : aiInsights.map((insight, index) => (
                  <div key={index} style={{
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "14px",
                    marginBottom: "10px",
                    fontSize: "14px",
                    color: "var(--text)"
                  }}>
                    🤖 {insight}
                  </div>
                ))
            }
          </div>

          {/* ANALYTICS */}
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-title">
              <span className="card-dot"/>
              Analytics
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ width: "100%", height: "300px" }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={analyticsData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                      {analyticsData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ width: "100%", height: "300px" }}>
                <ResponsiveContainer>
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="name" tick={{ fill: "#5a5a72", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#5a5a72", fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4f6ef2" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard
