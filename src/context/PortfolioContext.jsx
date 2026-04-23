import { createContext, useContext } from 'react';
import portfolioData from '../data/portfolio.json';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  return (
    <PortfolioContext.Provider value={portfolioData}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
