import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Lovey-dovey Birthday 21 website

function ShellIcon() {
  return (
    <svg className="shell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-6M12 2a9.5 9.5 0 0 0-9.5 9.5c0 3 2 5.5 4.5 7M12 2a9.5 9.5 0 0 1 9.5 9.5c0 3-2 5.5-4.5 7M12 10a4.5 4.5 0 0 0-4.5 4.5c0 1.5 1 2.5 2 3M12 10a4.5 4.5 0 0 1 4.5 4.5c0 1.5-1 2.5-2 3M12 6c-2 0-3.5 1-4 2.5M12 6c2 0 3.5 1 4 2.5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="heart-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function Boot({ next }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage < 2) setStage(stage + 1);
      else next();
    }, 1500);
    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="boot-screen">
      <div className="boot-content">
        <HeartIcon />
        <h1 className="fade-in">{stage === 0 ? "Preparing a surprise..." : stage === 1 ? "For the most special person..." : "Happy 21st Birthday!"}</h1>
      </div>
    </div>
  );
}

function Proposal1() {
  return (
    <section className="proposal-section">
      <div className="card">
        <h2>Proposal 1: A Special Evening</h2>
        <p className="date">August 22, 2026</p>
        <div className="details">
          <p>I would like to officially invite you to a dinner date.</p>
          <p className="highlight">Ved Street Regalia</p>
          <p>At 7:00 PM in the evening.</p>
          <p>Dress nicely, I have something important to ask you. 💍💖</p>
        </div>
      </div>
    </section>
  );
}

function Proposal2() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const checkPassword = (e) => {
    e.preventDefault();
    if (password.toUpperCase() === 'AYANA') {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (unlocked) {
    return (
      <section className="proposal-section">
        <div className="card unlocked">
          <h2>Proposal 2: The Grand Escape</h2>
          <p className="date">August 24 - 28, 2026</p>
          <div className="details">
            <p>Our bags are packed, and our destination is finally revealed!</p>
            <p>We are going to...</p>
            <h1 className="destination">UDAIPUR! 🏰✨</h1>
            <p>Get ready for the most magical trip together.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="proposal-section">
      <div className="card locked">
        <h2>Proposal 2: The Secret Trip</h2>
        <p className="date">August 24 - 28, 2026</p>
        <p>This destination is highly classified. You thought we were going somewhere else, didn't you?</p>
        <p>Enter the secret passcode to reveal our true destination.</p>
        
        <form onSubmit={checkPassword} className="password-form">
          <input 
            type="text" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Enter Passcode..."
            className={error ? 'error' : ''}
          />
          <button type="submit">Unlock Destination</button>
        </form>
        {error && <p className="error-text">Incorrect passcode, my love! Try again.</p>}
      </div>
    </section>
  );
}

function App() {
  const [started, setStarted] = useState(false);

  if (!started) return <Boot next={() => setStarted(true)} />;

  // 21 shells array
  const shells = Array.from({ length: 21 }, (_, i) => i);

  return (
    <div className="app-container">
      <div className="shells-bg">
        {shells.map((i) => (
          <div key={i} className="bg-shell" style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}>
            <ShellIcon />
          </div>
        ))}
      </div>

      <header className="header">
        <h1>Happy 21st Birthday, My Love!</h1>
        <p className="timeline">Today: August 20 | The Big Day: August 30</p>
        <div className="hearts">
          <HeartIcon /><HeartIcon /><HeartIcon />
        </div>
      </header>

      <main className="content">
        <div className="intro">
          <p>I have planned a series of surprises for you leading up to your birthday. Since you're turning 21, I wanted to make this the most memorable birthday ever.</p>
        </div>

        <div className="proposals-container">
          <Proposal1 />
          <Proposal2 />
        </div>
        
        <footer className="footer">
          <p>With all my love, Ayana 💖</p>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
