import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// ADMIN CONFIGURATION PANEL
// Ahana: You can update the details here easily.
const config = {
  whatsappNumber: "918928352406", // Added country code prefix assumption, standard for wa.me links
  passcode: "21",
  hint: "You are turning this age.",
  lockCode: "AYANA",
  dinnerProposal: {
    date: "August 22, 2026",
    time: "7:00 PM",
    venue: "Ved Street Regalia",
  },
  tripProposal: {
    dates: "August 24 - 28, 2026",
    destination: "Udaipur",
  }
};

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setActive(true);
    const up = () => setActive(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" style={{ left: pos.x, top: pos.y }} />
      <div className={`cursor-ring ${active ? 'active' : ''}`} style={{ left: pos.x, top: pos.y }} />
    </>
  );
}

function Boot({ onComplete }) {
  const [step, setStep] = useState(0);
  const lines = [
    "INITIALIZING SECURE PROTOCOLS...",
    "ESTABLISHING CONNECTION...",
    "HEY BIRTHDAY BOY,",
    "WE HAVE BEEN EXPECTING YOU."
  ];

  useEffect(() => {
    if (step < lines.length) {
      const t = setTimeout(() => setStep(step + 1), 1200);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onComplete, 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="boot-screen">
      <div className="terminal">
        {lines.slice(0, step + 1).map((line, i) => (
          <p key={i} className="typewriter">> {line}</p>
        ))}
        {step < lines.length && <span className="blink">_</span>}
      </div>
    </div>
  );
}

function Gate({ onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === config.passcode) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="gate-screen">
      <div className="auth-box">
        <h2 className="gold-text">AUTHENTICATION REQUIRED</h2>
        <p className="hint">HINT: {config.hint}</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="password" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            placeholder="ENTER PASSCODE"
            className={error ? 'error' : ''}
            maxLength={2}
          />
          <button type="submit" className="gold-btn">ENTER SYSTEM</button>
        </form>
      </div>
    </div>
  );
}

function DoorTransition({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="door-container">
      <div className="door door-left">
        <div className="door-detail"></div>
      </div>
      <div className="door door-right">
        <div className="door-detail"></div>
      </div>
      <div className="door-light"></div>
    </div>
  );
}

function Calendar({ openProposal }) {
  const days = [];
  for (let i = 20; i <= 30; i++) {
    days.push(i);
  }

  return (
    <div className="calendar-widget panel">
      <h3>AUGUST 2026 TIMELINE</h3>
      <div className="calendar-grid">
        {days.map(day => {
          let hasGift = day === 22 || day === 24;
          let label = day === 22 ? 'dinner' : (day === 24 ? 'trip' : '');
          return (
            <div 
              key={day} 
              className={`cal-day ${hasGift ? 'has-gift' : ''}`}
              onClick={() => hasGift && openProposal(label)}
            >
              <span className="date-num">{day}</span>
              {hasGift && <span className="gift-icon">🎁</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProposalDinner({ onClose }) {
  const handleAccept = () => {
    const text = encodeURIComponent("Hey Ahana! ❤️ I am officially accepting the invitation for dinner on August 22nd at Ved Street Regalia! Can't wait! 🥰🥂💍");
    window.open(`https://wa.me/${config.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="modal-overlay">
      <div className="modal premium-letter">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="letter-content">
          <p className="eyebrow">OFFICIAL INVITATION</p>
          <h1 className="gold-text">A Very Special Evening</h1>
          <hr className="gold-divider" />
          <p>My dearest Birthday Boy,</p>
          <p>You are cordially invited to an exclusive, highly important dinner date.</p>
          <div className="letter-details">
            <p><strong>VENUE:</strong> {config.dinnerProposal.venue}</p>
            <p><strong>DATE:</strong> {config.dinnerProposal.date}</p>
            <p><strong>TIME:</strong> {config.dinnerProposal.time}</p>
          </div>
          <p>Dress your absolute best. I have a very special proposal waiting for you.</p>
          <button className="gold-btn accept-btn" onClick={handleAccept}>ACCEPT INVITATION & SEND 💖</button>
        </div>
      </div>
    </div>
  );
}

function ProposalTrip({ onClose }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const checkPass = (e) => {
    e.preventDefault();
    if (pass.toUpperCase() === config.lockCode) {
      setUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleAccept = () => {
    const text = encodeURIComponent("Hey Ahana! 💖 I am so ready for our magical trip to Udaipur! I accept! ✈️🏰🥰");
    window.open(`https://wa.me/${config.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="modal-overlay">
      <div className="modal trip-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {!unlocked ? (
          <div className="lock-screen">
            <h2 className="gold-text">TOP SECRET DESTINATION</h2>
            <p>August 24 - 28, 2026</p>
            <p>The location of this trip is heavily guarded. Enter the master passcode to decrypt.</p>
            <form onSubmit={checkPass} className="trip-form">
              <input 
                type="text" 
                value={pass} 
                onChange={e => setPass(e.target.value)} 
                placeholder="ENTER SECRET CODE"
                className={error ? 'error' : ''}
              />
              <button type="submit" className="gold-btn">DECRYPT</button>
            </form>
          </div>
        ) : (
          <div className="unlocked-screen fade-in">
            <p className="eyebrow blue-text">DECRYPTION SUCCESSFUL</p>
            <h1 className="gold-text">WE ARE GOING TO {config.tripProposal.destination.toUpperCase()}!</h1>
            <p className="trip-dates">{config.tripProposal.dates}</p>
            <p>Get ready for the most incredible, luxurious birthday getaway. Pack your bags, your heart, and your love.</p>
            <button className="gold-btn accept-btn blue-glow" onClick={handleAccept}>CONFIRM ESCAPE & SEND ✈️</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard() {
  const [activeProposal, setActiveProposal] = useState(null);

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h1 className="gold-text">BIRTHDAY COMMAND CENTER</h1>
          <p className="blue-text">SUBJECT: BIRTHDAY BOY | STATUS: CELEBRATION IN PROGRESS</p>
        </div>
      </header>

      <main className="dash-grid">
        <div className="dash-col main-col">
          <div className="panel welcome-panel">
            <h2 className="gold-text">WELCOME TO YOUR 21ST</h2>
            <p>I have built this entire system to organize your birthday surprises. Keep an eye on the calendar. Some events require your immediate authorization.</p>
          </div>
          
          <div className="proposals-list panel">
            <h3 className="blue-text">PENDING AUTHORIZATIONS</h3>
            <div className="proposal-item" onClick={() => setActiveProposal('dinner')}>
              <div className="p-icon">🥂</div>
              <div className="p-info">
                <h4>OFFICIAL DINNER PROPOSAL</h4>
                <p>August 22, 2026</p>
              </div>
              <div className="p-action gold-text">REVIEW →</div>
            </div>
            
            <div className="proposal-item" onClick={() => setActiveProposal('trip')}>
              <div className="p-icon">🔒</div>
              <div className="p-info">
                <h4>CLASSIFIED GETAWAY</h4>
                <p>August 24 - 28, 2026</p>
              </div>
              <div className="p-action gold-text">UNLOCK →</div>
            </div>
          </div>
        </div>
        
        <div className="dash-col side-col">
          <Calendar openProposal={setActiveProposal} />
          
          <div className="panel stats-panel">
            <h3 className="blue-text">MISSION STATS</h3>
            <div className="stat">
              <span>AGE</span>
              <span className="gold-text">21</span>
            </div>
            <div className="stat">
              <span>LOVE LEVEL</span>
              <span className="gold-text">MAXIMUM</span>
            </div>
            <div className="stat">
              <span>SURPRISES LEFT</span>
              <span className="gold-text">MULTIPLE</span>
            </div>
          </div>
        </div>
      </main>

      {activeProposal === 'dinner' && <ProposalDinner onClose={() => setActiveProposal(null)} />}
      {activeProposal === 'trip' && <ProposalTrip onClose={() => setActiveProposal(null)} />}
    </div>
  );
}

function App() {
  const [stage, setStage] = useState('boot'); // boot, gate, door, dashboard

  return (
    <>
      <Cursor />
      {stage === 'boot' && <Boot onComplete={() => setStage('gate')} />}
      {stage === 'gate' && <Gate onUnlock={() => setStage('door')} />}
      {stage === 'door' && <DoorTransition onComplete={() => setStage('dashboard')} />}
      {stage === 'dashboard' && <Dashboard />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
