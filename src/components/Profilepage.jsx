import { useState } from "react";
import { FiX, FiUser, FiMail, FiCalendar, FiTarget, FiDollarSign, FiAward, FiTrendingUp } from "react-icons/fi";

const ProfileCard = ({ user, goals, transactions }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate stats
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const currentSavings = totalIncome - totalExpenses;

  const goalsAchieved = goals.filter(
    (g) => g.saved_amount >= g.target_amount
  ).length;

  const totalSavingsGoal = goals.reduce((acc, g) => acc + g.target_amount, 0);
  const totalSaved = goals.reduce((acc, g) => acc + g.saved_amount, 0);
  const overallProgress =
    totalSavingsGoal > 0
      ? Math.min((totalSaved / totalSavingsGoal) * 100, 100)
      : 0;

  return (
    <>
      {/* Avatar trigger button */}
      <button className="profile-trigger" onClick={() => setIsOpen(true)}>
        <div className="avatar">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <span className="profile-name">{user?.name || "User"}</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="profile-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Slide-in Panel */}
      <div className={`profile-panel ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          <FiX size={20} />
        </button>

        {/* Header */}
        <div className="panel-header">
          <div className="panel-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <h2 className="panel-name">{user?.name || "User Name"}</h2>
          <span className="panel-badge">Premium Member</span>
        </div>

        {/* Info Section */}
        <div className="panel-section">
          <h3 className="section-title">Profile Info</h3>
          <div className="info-row">
            <FiUser className="info-icon" />
            <div>
              <p className="info-label">Full Name</p>
              <p className="info-value">{user?.name || "—"}</p>
            </div>
          </div>
          <div className="info-row">
            <FiMail className="info-icon" />
            <div>
              <p className="info-label">Email</p>
              <p className="info-value">{user?.email || "—"}</p>
            </div>
          </div>
          <div className="info-row">
            <FiCalendar className="info-icon" />
            <div>
              <p className="info-label">Joined</p>
              <p className="info-value">{user?.joined || "January 2025"}</p>
            </div>
          </div>
        </div>

        {/* Current Savings */}
        <div className="panel-section">
          <h3 className="section-title">Current Savings</h3>
          <div className="savings-card">
            <div className="savings-row">
              <FiDollarSign className="savings-icon green" />
              <div>
                <p className="info-label">Total Income</p>
                <p className="savings-amount green">${totalIncome.toLocaleString()}</p>
              </div>
            </div>
            <div className="savings-row">
              <FiTrendingUp className="savings-icon red" />
              <div>
                <p className="info-label">Total Expenses</p>
                <p className="savings-amount red">${totalExpenses.toLocaleString()}</p>
              </div>
            </div>
            <div className="savings-divider" />
            <div className="savings-row">
              <FiDollarSign className="savings-icon blue" />
              <div>
                <p className="info-label">Net Savings</p>
                <p className="savings-amount blue">${currentSavings.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Goals Achieved */}
        <div className="panel-section">
          <h3 className="section-title">Goals Achieved</h3>
          <div className="goals-summary">
            <div className="goal-stat">
              <FiAward className="goal-icon" />
              <p className="goal-count">{goalsAchieved}</p>
              <p className="goal-label">Completed</p>
            </div>
            <div className="goal-stat">
              <FiTarget className="goal-icon" />
              <p className="goal-count">{goals.length}</p>
              <p className="goal-label">Total Goals</p>
            </div>
            <div className="goal-stat">
              <FiTrendingUp className="goal-icon" />
              <p className="goal-count">{overallProgress.toFixed(0)}%</p>
              <p className="goal-label">Overall</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar-wrapper">
            <div className="progress-bar-labels">
              <span>Savings Progress</span>
              <span>${totalSaved.toLocaleString()} / ${totalSavingsGoal.toLocaleString()}</span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          {/* Individual Goals */}
          <div className="goals-list">
            {goals.map((goal, index) => {
              const pct = Math.min(
                (goal.saved_amount / goal.target_amount) * 100,
                100
              );
              return (
                <div className="goal-item" key={index}>
                  <div className="goal-item-header">
                    <span className="goal-item-title">{goal.title}</span>
                    <span
                      className={`goal-item-badge ${
                        pct >= 100 ? "achieved" : "in-progress"
                      }`}
                    >
                      {pct >= 100 ? "✓ Done" : `${pct.toFixed(0)}%`}
                    </span>
                  </div>
                  <div className="goal-mini-track">
                    <div
                      className={`goal-mini-fill ${pct >= 100 ? "achieved" : ""}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .profile-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 10px;
          transition: background 0.2s;
        }
        .profile-trigger:hover {
          background: rgba(255,255,255,0.07);
        }
        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6c63ff, #48c9b0);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          color: #fff;
          flex-shrink: 0;
        }
        .profile-name {
          color: #e2e8f0;
          font-size: 14px;
          font-weight: 500;
        }
        .profile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 99;
          backdrop-filter: blur(2px);
        }
        .profile-panel {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 340px;
          background: #0f172a;
          border-left: 1px solid rgba(255,255,255,0.08);
          z-index: 100;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 24px 24px 40px;
        }
        .profile-panel.open {
          transform: translateX(0);
        }
        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255,255,255,0.07);
          border: none;
          color: #94a3b8;
          border-radius: 8px;
          padding: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .close-btn:hover {
          background: rgba(255,255,255,0.12);
          color: #e2e8f0;
        }
        .panel-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 0 24px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 8px;
        }
        .panel-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6c63ff, #48c9b0);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
        }
        .panel-name {
          color: #f1f5f9;
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px;
        }
        .panel-badge {
          background: rgba(108,99,255,0.15);
          color: #a5b4fc;
          font-size: 12px;
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid rgba(108,99,255,0.3);
        }
        .panel-section {
          margin-top: 20px;
          padding-top: 4px;
        }
        .section-title {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: #64748b;
          margin: 0 0 12px;
        }
        .info-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .info-icon {
          color: #6c63ff;
          font-size: 18px;
          flex-shrink: 0;
        }
        .info-label {
          font-size: 11px;
          color: #64748b;
          margin: 0 0 2px;
        }
        .info-value {
          font-size: 14px;
          color: #e2e8f0;
          margin: 0;
          font-weight: 500;
        }
        .savings-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 12px 16px;
        }
        .savings-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 8px 0;
        }
        .savings-icon {
          font-size: 18px;
          flex-shrink: 0;
        }
        .savings-icon.green { color: #34d399; }
        .savings-icon.red { color: #f87171; }
        .savings-icon.blue { color: #60a5fa; }
        .savings-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 4px 0;
        }
        .savings-amount {
          font-size: 15px;
          font-weight: 600;
          margin: 0;
        }
        .savings-amount.green { color: #34d399; }
        .savings-amount.red { color: #f87171; }
        .savings-amount.blue { color: #60a5fa; }
        .goals-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }
        .goal-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 12px 8px;
          text-align: center;
        }
        .goal-icon {
          color: #6c63ff;
          font-size: 18px;
          margin-bottom: 6px;
        }
        .goal-count {
          font-size: 20px;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 2px;
        }
        .goal-label {
          font-size: 11px;
          color: #64748b;
          margin: 0;
        }
        .progress-bar-wrapper {
          margin-bottom: 16px;
        }
        .progress-bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 6px;
        }
        .progress-bar-track {
          height: 8px;
          background: rgba(255,255,255,0.07);
          border-radius: 99px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #6c63ff, #48c9b0);
          border-radius: 99px;
          transition: width 0.6s ease;
        }
        .goals-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .goal-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 10px 12px;
        }
        .goal-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .goal-item-title {
          font-size: 13px;
          color: #cbd5e1;
          font-weight: 500;
        }
        .goal-item-badge {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 20px;
          font-weight: 600;
        }
        .goal-item-badge.achieved {
          background: rgba(52,211,153,0.12);
          color: #34d399;
          border: 1px solid rgba(52,211,153,0.25);
        }
        .goal-item-badge.in-progress {
          background: rgba(108,99,255,0.12);
          color: #a5b4fc;
          border: 1px solid rgba(108,99,255,0.25);
        }
        .goal-mini-track {
          height: 5px;
          background: rgba(255,255,255,0.07);
          border-radius: 99px;
          overflow: hidden;
        }
        .goal-mini-fill {
          height: 100%;
          background: #6c63ff;
          border-radius: 99px;
          transition: width 0.5s ease;
        }
        .goal-mini-fill.achieved {
          background: #34d399;
        }
      `}</style>
    </>
  );
};

export default Profilepage;