import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const config = {
  whatsappNumber: "918928352406",
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

const shopData = [
  {
    category: "Signature Scents",
    items: [
      { id: 'p1', name: "Bella Vita CEO Man", desc: "A bold, confident fragrance." },
      { id: 'p2', name: "Wild Stone Edge", desc: "Crisp, fresh, and energetic." },
      { id: 'p3', name: "Denver Hamilton", desc: "Classic and sophisticated." },
      { id: 'p4', name: "Beardo Godfather", desc: "Intense and long-lasting." }
    ]
  },
  {
    category: "The Attar Collection",
    items: [
      { id: 'a1', name: "Oud Al Layl", desc: "Rich and woody essence." },
      { id: 'a2', name: "White Musk", desc: "Soft, clean, and romantic." },
      { id: 'a3', name: "Majmua Attar", desc: "A mesmerizing traditional blend." },
      { id: 'a4', name: "Ruh Khus", desc: "Earthy and calming." }
    ]
  },
  {
    category: "Wardrobe Essentials",
    items: [
      { id: 'c1', name: "Classic Black Turtleneck", desc: "For that elegant evening look." },
      { id: 'c2', name: "Tailored Trousers", desc: "Sharp and perfectly fitted." },
      { id: 'c3', name: "Crisp White Shirt", desc: "A timeless wardrobe staple." },
      { id: 'c4', name: "Casual Graphic T-Shirt", desc: "For your relaxed weekends." },
      { id: 'c5', name: "Comfort Track Pants", desc: "Because comfort is key." }
    ]
  },
  {
    category: "Accessories",
    items: [
      { id: 's1', name: "Vintage Aviators", desc: "Classic top-gun style." },
      { id: 's2', name: "Classic Wayfarers", desc: "Sleek and versatile." },
      { id: 's3', name: "Retro Round Frames", desc: "For a sophisticated vintage look." }
    ]
  },
  {
    category: "The Armory (Toy Guns)",
    items: [
      { id: 'g1', name: "Gel Blaster Surge", desc: "High-speed water bead action." },
      { id: 'g2', name: "Nerf Elite 2.0 Commander", desc: "Reliable and tactically superior." },
      { id: 'g3', name: "Precision Sniper (Toy)", desc: "For extreme long-range foam darting." }
    ]
  }
];

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
    "ESTABLISHING SECURE CONNECTION...",
    "AUTHENTICATING VIP PROTOCOLS...",
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
          <p key={i} className="typewriter">&gt; {line}</p>
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
      <div className="auth-box elegant-panel">
        <h2 className="gold-text">RESTRICTED ACCESS</h2>
        <div className="elegant-divider"></div>
        <p className="hint">Hint: {config.hint}</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="password" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            placeholder="PASSCODE"
            className={error ? 'error' : ''}
            maxLength={2}
          />
          <button type="submit" className="gold-btn btn-elegant">ENTER</button>
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
        <div className="door-detail-elegant"></div>
      </div>
      <div className="door door-right">
        <div className="door-detail-elegant right"></div>
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
    <div className="elegant-panel calendar-widget">
      <h3 className="gold-text centered">AUGUST 2026 TIMELINE</h3>
      <div className="elegant-divider"></div>
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
              {hasGift && <span className="gift-icon">✧</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProposalDinner({ onClose }) {
  const handleAccept = () => {
    const text = encodeURIComponent("Hey Ahana! ✨ I accept the dinner invitation at Ved Street Regalia on August 22nd. I'll be there! 🥂💍");
    window.open(`https://wa.me/${config.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="modal-overlay">
      <div className="modal premium-letter">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="letter-inner border-elegant">
          <p className="eyebrow">A FORMAL INVITATION</p>
          <h1 className="gold-text script-text">A Special Evening</h1>
          <div className="elegant-divider"></div>
          <p className="salutation">My Dearest,</p>
          <p>You are cordially invited to an exclusive dinner date.</p>
          <div className="letter-details">
            <p><strong>VENUE</strong> <br/>{config.dinnerProposal.venue}</p>
            <p><strong>DATE</strong> <br/>{config.dinnerProposal.date}</p>
            <p><strong>TIME</strong> <br/>{config.dinnerProposal.time}</p>
          </div>
          <p>Dress your absolute best. I have a very special proposal waiting for you.</p>
          <button className="gold-btn accept-btn" onClick={handleAccept}>ACCEPT INVITATION ✧</button>
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
    const text = encodeURIComponent("Hey Ahana! ✈️ I've decrypted the secret destination! I am so ready for Udaipur! 🏰✨");
    window.open(`https://wa.me/${config.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="modal-overlay">
      <div className="modal premium-letter">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="letter-inner border-elegant">
          {!unlocked ? (
            <div className="lock-screen">
              <p className="eyebrow">CLASSIFIED FILES</p>
              <h2 className="gold-text">TOP SECRET ESCAPE</h2>
              <div className="elegant-divider"></div>
              <p className="trip-dates-preview">August 24 - 28, 2026</p>
              <p className="lock-desc">The true destination of this trip is highly classified. Enter the master passcode to decrypt.</p>
              <form onSubmit={checkPass} className="trip-form">
                <input 
                  type="text" 
                  value={pass} 
                  onChange={e => setPass(e.target.value)} 
                  placeholder="SECRET CODE"
                  className={error ? 'error' : ''}
                />
                <button type="submit" className="gold-btn">DECRYPT FILES</button>
              </form>
            </div>
          ) : (
            <div className="unlocked-screen fade-in">
              <p className="eyebrow blue-text">DECRYPTION SUCCESSFUL</p>
              <h1 className="gold-text script-text large">UDAIPUR</h1>
              <div className="elegant-divider"></div>
              <p className="trip-dates">{config.tripProposal.dates}</p>
              <p className="lock-desc">Get ready for the most incredible, luxurious birthday getaway. Pack your bags, your heart, and your love.</p>
              <button className="gold-btn accept-btn blue-glow" onClick={handleAccept}>CONFIRM ESCAPE ✈️</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Shop({ cart, setCart }) {
  const toggleItem = (item) => {
    const exists = cart.find(c => c.id === item.id);
    if (exists) {
      setCart(cart.filter(c => c.id !== item.id));
    } else {
      setCart([...cart, item]);
    }
  };

  return (
    <div className="shop-section" id="boutique">
      <h2 className="gold-text centered section-title">THE VIP BOUTIQUE</h2>
      <p className="centered shop-desc">Add whatever you desire to your exclusive birthday wishlist.</p>
      <div className="elegant-divider centered-div"></div>
      
      {shopData.map(cat => (
        <div key={cat.category} className="shop-category">
          <h3 className="cat-title gold-text">{cat.category}</h3>
          <div className="shop-grid">
            {cat.items.map(item => {
              const inCart = cart.find(c => c.id === item.id);
              return (
                <div key={item.id} className={`elegant-panel shop-item ${inCart ? 'selected' : ''}`}>
                  <div className="item-content">
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <button 
                    className={`gold-btn small-btn ${inCart ? 'in-cart' : ''}`}
                    onClick={() => toggleItem(item)}
                  >
                    {inCart ? '✓ ADDED' : '+ ADD TO CART'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function CartModal({ cart, onClose }) {
  const sendWishlist = () => {
    const items = cart.map(c => `- ${c.name}`).join('%0A');
    const text = encodeURIComponent(`Hey Ahana! 🎁 Here is my official birthday wishlist!%0A%0A${cart.length > 0 ? decodeURIComponent(items) : "Actually, I have everything I need because I have you! 🥰"}`);
    window.open(`https://wa.me/${config.whatsappNumber}?text=${text}`, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay cart-overlay">
      <div className="modal premium-letter">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="letter-inner border-elegant wishlist-container">
          <h2 className="gold-text script-text">Your Wishlist</h2>
          <div className="elegant-divider"></div>
          
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty. Please visit the VIP Boutique to select your gifts.</p>
          ) : (
            <ul className="cart-list print-area">
              {cart.map(item => (
                <li key={item.id}>
                  <span className="gold-text">✧</span> {item.name}
                </li>
              ))}
            </ul>
          )}

          <div className="cart-actions no-print">
            <button className="gold-btn accept-btn" onClick={sendWishlist}>SEND TO AHANA 💌</button>
            <button className="gold-btn secondary-btn" onClick={handlePrint}>DOWNLOAD PDF 📄</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [activeProposal, setActiveProposal] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="dashboard-scroll-container">
      
      {/* STICKY CART BUTTON */}
      <button className="sticky-cart gold-btn" onClick={() => setShowCart(true)}>
        WISH LIST ({cart.length})
      </button>

      <div className="dashboard">
        <header className="elegant-header">
          <h1 className="gold-text script-text main-title">Birthday Command Center</h1>
          <p className="blue-text tracking-text">SUBJECT: BIRTHDAY BOY | STATUS: CELEBRATION IN PROGRESS</p>
        </header>

        <main className="dash-grid">
          <div className="dash-col main-col">
            <div className="elegant-panel welcome-panel">
              <h2 className="gold-text">WELCOME TO YOUR 21ST</h2>
              <div className="elegant-divider left"></div>
              <p>I have built this entire system to organize your birthday surprises. Explore the timeline, authorize pending events, and curate your personalized wishlist in the VIP Boutique below.</p>
            </div>
            
            <div className="proposals-list elegant-panel">
              <h3 className="gold-text">PENDING AUTHORIZATIONS</h3>
              <div className="elegant-divider left"></div>
              
              <div className="proposal-item-elegant" onClick={() => setActiveProposal('dinner')}>
                <div className="p-icon">🥂</div>
                <div className="p-info">
                  <h4>OFFICIAL DINNER PROPOSAL</h4>
                  <p>August 22, 2026</p>
                </div>
                <div className="p-action gold-text">REVIEW →</div>
              </div>
              
              <div className="proposal-item-elegant" onClick={() => setActiveProposal('trip')}>
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
            
            <div className="elegant-panel stats-panel">
              <h3 className="gold-text centered">MISSION STATS</h3>
              <div className="elegant-divider centered-div"></div>
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

        <div className="section-separator">
          <span className="gold-text">✧ ✧ ✧</span>
        </div>

        <Shop cart={cart} setCart={setCart} />

        <footer className="elegant-footer">
          <p className="gold-text script-text">With all my love, Ayana.</p>
        </footer>

        {activeProposal === 'dinner' && <ProposalDinner onClose={() => setActiveProposal(null)} />}
        {activeProposal === 'trip' && <ProposalTrip onClose={() => setActiveProposal(null)} />}
        {showCart && <CartModal cart={cart} onClose={() => setShowCart(false)} />}
      </div>
    </div>
  );
}

function App() {
  const [stage, setStage] = useState('boot');

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
