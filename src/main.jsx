import React, { useState, useEffect, useRef } from 'react';
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
    targetDate: "2026-08-22T19:00:00"
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

// -----------------------------------------------------
// PARTICLES & CURSOR
// -----------------------------------------------------

function GoldDust() {
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}vw`,
    size: `${Math.random() * 4 + 1}px`,
    duration: `${Math.random() * 20 + 10}s`,
    delay: `-${Math.random() * 20}s`,
    opacity: Math.random() * 0.5 + 0.2
  }));

  return (
    <div className="gold-dust-container">
      {particles.map(p => (
        <div 
          key={p.id} 
          className="dust-particle" 
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity
          }}
        />
      ))}
    </div>
  );
}

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

// -----------------------------------------------------
// 3D VIP CARD
// -----------------------------------------------------

function VIPCard() {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; // max 15 deg
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.4
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ ...glare, opacity: 0 });
  };

  return (
    <div className="vip-card-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div 
        ref={cardRef} 
        className="vip-card"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        <div className="vip-glare" style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 50%)`
        }} />
        <div className="vip-content">
          <div className="vip-header">
            <span className="vip-logo">A.I.B.O.</span>
            <span className="vip-status">ELITE MEMBER</span>
          </div>
          <div className="vip-chip"></div>
          <div className="vip-details">
            <h2>AYUSH PARDESHI</h2>
            <p className="vip-title">Founder & MD of Aetheron AI Technologies Pvt Ltd</p>
            <div className="vip-funny">
              <span className="strike">Boyfriend of Miss Ahana Kulkarni</span>
              <span className="tiny-text">(Status Pending: Awaiting Proposal)</span>
            </div>
          </div>
          <div className="vip-footer">
            <span>VALID THRU: FOREVER</span>
            <span>MEMBERSHIP: 21ST EDITION</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------
// LUXURY COUNTDOWN
// -----------------------------------------------------

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(config.dinnerProposal.targetDate).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        clearInterval(interval);
      } else {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-container">
      <h3 className="gold-gradient-text centered countdown-title">T-MINUS UNTIL THE BIG PROPOSAL</h3>
      <div className="countdown-grid">
        <div className="cd-box">
          <span className="cd-num">{String(timeLeft.d).padStart(2, '0')}</span>
          <span className="cd-label">DAYS</span>
        </div>
        <div className="cd-sep">:</div>
        <div className="cd-box">
          <span className="cd-num">{String(timeLeft.h).padStart(2, '0')}</span>
          <span className="cd-label">HOURS</span>
        </div>
        <div className="cd-sep">:</div>
        <div className="cd-box">
          <span className="cd-num">{String(timeLeft.m).padStart(2, '0')}</span>
          <span className="cd-label">MINS</span>
        </div>
        <div className="cd-sep">:</div>
        <div className="cd-box">
          <span className="cd-num">{String(timeLeft.s).padStart(2, '0')}</span>
          <span className="cd-label">SECS</span>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------
// CONCIERGE CHAT
// -----------------------------------------------------

function Concierge() {
  const prompts = [
    { q: "What is the dress code for August 22?", a: "Sharp, elegant, and ready to sweep her off her feet." },
    { q: "Can I get a hint about the trip?", a: "I am sworn to secrecy, sir. Miss Ahana has explicitly forbidden any leaks." },
    { q: "What happens if I say no to the proposals?", a: "Error 404: Option not found. Miss Ahana does not take no for an answer." },
    { q: "Who funded this entire operation?", a: "The Bank of Ahana's EXTREME Amount of Love for You." },
    { q: "Why are we going to Udaipur?", a: "Because a king deserves to be celebrated in a city of palaces." },
    { q: "Is she actually proposing?", a: "I cannot confirm nor deny. But I would strongly advise you to practice your 'Yes'." }
  ];

  const [chat, setChat] = useState([{ type: 'agent', text: "Welcome back, Mr. Pardeshi. I am your private Birthday Concierge. How may I assist you today?" }]);
  const [typing, setTyping] = useState(false);

  const ask = (prompt) => {
    setChat([...chat, { type: 'user', text: prompt.q }]);
    setTyping(true);
    setTimeout(() => {
      setChat(prev => [...prev, { type: 'agent', text: prompt.a }]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="elegant-panel concierge-panel">
      <h3 className="gold-text centered"><span className="icon">🤵‍♂️</span> THE CONCIERGE</h3>
      <div className="elegant-divider"></div>
      
      <div className="chat-window">
        {chat.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        {typing && <div className="chat-bubble agent typing">...</div>}
      </div>
      
      <div className="chat-prompts">
        {prompts.map((p, i) => (
          <button key={i} className="gold-btn small-btn prompt-btn" onClick={() => ask(p)} disabled={typing}>
            {p.q}
          </button>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// BOOT & GATE
// -----------------------------------------------------

function Boot({ onComplete }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const lines = [
    "Establishing secure connection to A.I.B.O. servers...",
    "Authenticating VIP protocols for subject 21...",
    "Bypassing standard security measures...",
    "Hey Birthday Boy,",
    "We have been expecting you."
  ];

  useEffect(() => {
    if (step < lines.length) {
      const t = setTimeout(() => {
        setStep(step + 1);
        setProgress(((step + 1) / lines.length) * 100);
      }, 2500);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onComplete, 3000);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="boot-screen">
      <div className="terminal">
        {lines.slice(0, step + 1).map((line, i) => (
          <p key={i} className="typewriter" style={{ animationDelay: '0.2s' }}>{line}</p>
        ))}
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
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
        <h2 className="gold-gradient-text">RESTRICTED ACCESS</h2>
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

// -----------------------------------------------------
// DASHBOARD WIDGETS & MODALS
// -----------------------------------------------------

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
          <h1 className="gold-gradient-text script-text">A Special Evening</h1>
          <div className="elegant-divider"></div>
          <p className="salutation">My Dearest Ayush,</p>
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
              <h1 className="gold-gradient-text script-text large">UDAIPUR</h1>
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

// -----------------------------------------------------
// SHOPPING EXPERIENCE
// -----------------------------------------------------

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
      <h2 className="gold-gradient-text centered section-title">THE VIP BOUTIQUE</h2>
      <p className="centered shop-desc">Curate your personalized birthday wishlist.</p>
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
          <h2 className="gold-gradient-text script-text">Your Wishlist</h2>
          <div className="elegant-divider"></div>
          
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty. Please visit the VIP Boutique.</p>
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

// -----------------------------------------------------
// MAIN DASHBOARD
// -----------------------------------------------------

function Dashboard() {
  const [activeProposal, setActiveProposal] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="dashboard-scroll-container">
      <GoldDust />
      
      <button className="sticky-cart gold-btn" onClick={() => setShowCart(true)}>
        WISH LIST ({cart.length})
      </button>

      <div className="dashboard">
        
        {/* VIP CARD COMPONENT */}
        <div className="card-section">
          <VIPCard />
        </div>

        {/* LUXURY COUNTDOWN */}
        <Countdown />

        <div className="section-separator"><span className="gold-text">✧ ✧ ✧</span></div>

        <main className="dash-grid">
          <div className="dash-col main-col">
            <div className="elegant-panel welcome-panel">
              <h2 className="gold-gradient-text">WELCOME TO YOUR 21ST</h2>
              <div className="elegant-divider left"></div>
              <p>I have built this entire system to organize your birthday surprises. Explore the timeline, authorize pending events, chat with your concierge, and curate your personalized wishlist below.</p>
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
            <Concierge />
          </div>
        </main>

        <div className="section-separator"><span className="gold-text">✧ ✧ ✧</span></div>

        <Shop cart={cart} setCart={setCart} />

        <footer className="elegant-footer">
          <p className="gold-text script-text">With all my love, Ahana.</p>
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
