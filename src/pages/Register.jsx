import { useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logoimage.png"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface2: #18181f;
    --border: rgba(255,255,255,0.06);
    --accent: #c8f542;
    --accent2: #7c3aed;
    --red: #ff4d6d;
    --text: #f0f0f0;
    --muted: #666680;
  }

  body { background: var(--bg); font-family: 'Syne', sans-serif; }

  .auth-page {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(200,245,66,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,245,66,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  .bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    pointer-events: none;
    z-index: 0;
  }
  .orb1 { width: 500px; height: 500px; background: rgba(124,58,237,0.12); top: -100px; right: -100px; }
  .orb2 { width: 400px; height: 400px; background: rgba(200,245,66,0.06); bottom: -100px; left: -100px; }

  .auth-card {
    position: relative;
    z-index: 1;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 48px 40px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 0 60px rgba(124,58,237,0.08);
  }

  .auth-logo {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }
  .auth-logo img {
    width: 90px;
    height: 90px;
    object-fit: contain;
    filter: drop-shadow(0 0 12px rgba(59,130,246,0.35));
  }

  .auth-title {
    font-size: 26px;
    font-weight: 800;
    text-align: center;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }

  .auth-subtitle {
    font-size: 12px;
    font-family: 'DM Mono', monospace;
    color: var(--muted);
    text-align: center;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 36px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 24px;
  }

  .field-label {
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    color: var(--muted);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .field-wrap {
    display: flex;
    flex-direction: column;
  }

  .styled-input {
    padding: 14px 16px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text);
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }
  .styled-input::placeholder { color: var(--muted); }
  .styled-input:focus {
    border-color: rgba(200,245,66,0.4);
    box-shadow: 0 0 0 3px rgba(200,245,66,0.06);
  }

  .submit-btn {
    width: 100%;
    padding: 15px;
    background: var(--accent);
    color: #0a0a0f;
    border: none;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .submit-btn:hover {
    background: #d4f85e;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(200,245,66,0.2);
  }
  .submit-btn:active { transform: translateY(0); }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .divider-line {
    flex: 1;
    height: 1px;
    background: var(--border);
  }
  .divider-text {
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    color: var(--muted);
    letter-spacing: 1px;
  }

  .auth-footer {
    text-align: center;
    font-size: 13px;
    color: var(--muted);
    font-family: 'DM Mono', monospace;
  }
  .auth-footer a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;
  }
  .auth-footer a:hover { opacity: 0.8; }

  .password-hint {
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    color: var(--muted);
    margin-top: 6px;
  }
`

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

const handleRegister = async (e) => {

  e.preventDefault()

  if (!name || !email || !password) {

    alert("Please fill all fields")

    return

  }

  try {

    const response = await API.post(

      "/auth/register",

      {
        name,
        email,
        password
      }

    )

    console.log(response.data)

    alert("Registration Successful")

    navigate("/")

  }

  catch (error) {

    console.log(error)

    alert("Registration Failed")

  }

}

  return (
    <>
      <style>{styles}</style>
      <div className="auth-page">
        <div className="bg-grid" />
        <div className="bg-orb orb1" />
        <div className="bg-orb orb2" />

        <div className="auth-card">
          <div className="auth-logo">
            <img src={logo} alt="ExpenseTracker" />
          </div>

          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">start tracking your expenses</p>

          <form onSubmit={handleRegister}>
            <div className="field-group">
              <div className="field-wrap">
                <p className="field-label">Full Name</p>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="styled-input"
                />
              </div>
              <div className="field-wrap">
                <p className="field-label">Email</p>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="styled-input"
                />
              </div>
              <div className="field-wrap">
                <p className="field-label">Password</p>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="styled-input"
                />
                <p className="password-hint">min. 8 characters recommended</p>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or</span>
            <div className="divider-line" />
          </div>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
