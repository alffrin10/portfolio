import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

/**
 * CurrentlyBuilding — Persistent slim ticker banner (FEATURE 3)
 *
 * Sits just below the Navbar (top: 46px via CSS).
 * Reads from portfolio.json `currentlyBuilding` array.
 * Filters out comment-style entries (starting with "//").
 * Falls back gracefully if array is empty / all comments.
 *
 * NOTE TO FUTURE SELF (Antigravity):
 *   The currentlyBuilding array in portfolio.json currently contains
 *   only placeholder comment strings starting with "//".
 *   To activate the ticker, replace those with real project strings.
 *   Example:
 *     "currentlyBuilding": [
 *       "Sim-to-real locomotion with Isaac Lab + PPO",
 *       "Spherical robotic wrist (Rosheim mechanism)",
 *       "God's Eye — distributed recon AI agent"
 *     ]
 */
export default function CurrentlyBuilding({ theme }) {
  const data = usePortfolio();
  const items = data.currentlyBuilding || [];
  const [current, setCurrent] = useState(0);

  // Filter out placeholder comment lines
  const realItems = items.filter(item => !String(item).startsWith('//'));

  useEffect(() => {
    if (realItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % realItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [realItems.length]);

  // Don't render if no real items
  if (realItems.length === 0) return null;

  return (
    <div className="ticker-bar" role="status" aria-live="polite" aria-label="Currently building">
      <span className="ticker-dot" aria-hidden="true" />
      <span className="ticker-prefix">
        {theme === 'luminus' ? '~/building $' : 'building →'}
      </span>
      <div className="ticker-content">
        {realItems.map((item, i) => (
          <span
            key={i}
            className={`ticker-item${i === current ? ' active' : ''}`}
            aria-hidden={i !== current}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

