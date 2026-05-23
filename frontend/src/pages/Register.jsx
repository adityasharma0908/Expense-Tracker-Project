import { useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logoimage.png"

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
    --text:       #1a1a2e;
    --text-2:     #5a5a72;
    --text-3:     #a0a0b8;
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }

  body {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .auth-page {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }

  /* ── CARD ── */
  .auth-card {
    position: relative; z-index: 1;
    width: 100%; max-width: 400px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 44px 36px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);
    animation: fadeUp .5s ease both;
  }

  .auth-logo {
    display: flex; justify-content: center;
    margin-bottom: 28px;
  }
  .auth-logo img {
    width: 52px; height: 52px; object-fit: contain;
  }

  .auth-title {
    font-size: 22px; font-weight: 600;
    letter-spacing: -.4px; text-align: center;
    color: var(--text); margin-bottom: 4px;
  }
  .auth-sub {
    font-size: 13px; font-family: 'DM Mono', monospace;
    color: var(--text-3); text-align: center;
    letter-spacing: .5px; margin-bottom: 32px;
  }

  /* ── FIELDS ── */
  .field-group { display:flex; flex-direction:column; gap:16px; margin-bottom:22px; }
  .field-wrap  { display:flex; flex-direction:column; gap:6px; }

  .field-label {
    font-size: 11px; font-family: 'DM Mono', monospace;
    color: var(--text-2); letter-spacing: 1px; text-transform: uppercase;
  }

  .input-shell { position:relative; display:flex; align-items:center; }

  .field-icon {
    position: absolute; left: 13px;
    color: var(--text-3); width: 14px; height: 14px;
    pointer-events: none; transition: color .2s;
  }
  .input-shell:focus-within .field-icon { color: var(--accent); }

  .styled-input {
    width: 100%; padding: 12px 16px 12px 38px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: 'DM Mono', monospace; font-size: 13px;
    outline: none;
    transition: border-color .2s, background .2s, box-shadow .2s;
  }
  .styled-input::placeholder { color: var(--text-3); }
  .styled-input:hover { background: var(--surface3); border-color: rgba(0,0,0,0.12); }
  .styled-input:focus {
    background: #fff;
    border-color: var(--border-hi);
    box-shadow: 0 0 0 3px var(--accent-dim);
  }

  .field-hint {
    font-size: 11px; font-family: 'DM Mono', monospace;
    color: var(--text-3); letter-spacing: .3px;
  }

  /* ── BUTTON ── */
  .submit-btn {
    width: 100%; padding: 13px;
    background: var(--accent); color: #fff;
    border: none; border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    letter-spacing: .3px; cursor: pointer;
    transition: all .18s ease;
    box-shadow: 0 2px 10px rgba(79,110,242,0.22);
    margin-bottom: 22px;
  }
  .submit-btn:hover {
    background: #3d5ae0;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(79,110,242,0.28);
  }
  .submit-btn:active { transform: translateY(0); box-shadow: 0 2px 8px rgba(79,110,242,0.18); }

  /* ── DIVIDER ── */
  .divider { display:flex; align-items:center; gap:12px; margin-bottom:22px; }
  .divider-line { flex:1; height:1px; background:var(--border); }
  .divider-text {
    font-size: 11px; font-family: 'DM Mono', monospace;
    color: var(--text-3); letter-spacing: 1px;
  }

  /* ── FOOTER ── */
  .auth-footer {
    text-align: center; font-size: 13px;
    color: var(--text-3); font-family: 'DM Mono', monospace;
  }
  .auth-footer a {
    color: var(--accent); text-decoration: none;
    transition: opacity .2s;
  }
  .auth-footer a:hover { opacity: .75; }
`

const UserIcon = () => (
  <svg className="field-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="5" r="3"/>
    <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6"/>
  </svg>
)
const MailIcon = () => (
  <svg className="field-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="3" width="14" height="10" rx="2"/>
    <path d="M1 5l7 5 7-5"/>
  </svg>
)
const LockIcon = () => (
  <svg className="field-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="7" width="10" height="8" rx="1.5"/>
    <path d="M5 7V5a3 3 0 016 0v2"/>
  </svg>
)

function Register() {
  const [name, setName]         = useState("")
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) { alert("Please fill all fields"); return }
    try {
      const response = await API.post("/auth/register", { name, email, password })
      console.log(response.data)
      alert("Registration Successful")
      navigate("/")
    } catch (error) {
      console.log(error)
      alert("Registration Failed")
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="auth-page">

        <div className="auth-card">
          <div className="auth-logo">
            <img src={logo} alt="ExpenseTracker"/>
          </div>

          <h1 className="auth-title">Create account</h1>
          <p className="auth-sub">Start tracking your expenses</p>

          <form onSubmit={handleRegister}>
            <div className="field-group">
              <div className="field-wrap">
                <label className="field-label">Full name</label>
                <div className="input-shell">
                  <input
                    type="text" placeholder="Your Name"
                    className="styled-input"
                    value={name} onChange={e => setName(e.target.value)}
                  />
                  <UserIcon/>
                </div>
              </div>
              <div className="field-wrap">
                <label className="field-label">Email</label>
                <div className="input-shell">
                  <input
                    type="email" placeholder="you@example.com"
                    className="styled-input"
                    value={email} onChange={e => setEmail(e.target.value)}
                  />
                  <MailIcon/>
                </div>
              </div>
              <div className="field-wrap">
                <label className="field-label">Password</label>
                <div className="input-shell">
                  <input
                    type="password" placeholder="••••••••••"
                    className="styled-input"
                    value={password} onChange={e => setPassword(e.target.value)}
                  />
                  <LockIcon/>
                </div>
                <span className="field-hint">min. 8 characters recommended</span>
              </div>
            </div>

            <button type="submit" className="submit-btn">Create account</button>
          </form>

          <div className="divider">
            <div className="divider-line"/>
            <span className="divider-text">or</span>
            <div className="divider-line"/>
          </div>

          <p className="auth-footer">
            Have an account? <Link to="/">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register