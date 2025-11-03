
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
  const [investment, setInvestment] = useState<string>('10000');
  const [cost, setCost] = useState<string>('12000');
  const [sellPrice, setSellPrice] = useState<string>('20000');

  const calculations = useMemo(() => {
    const numInvestment = parseFloat(investment) || 0;
    const numCost = parseFloat(cost) || 0;
    const numSellPrice = parseFloat(sellPrice) || 0;

    if (numCost === 0) {
      return {
        profit: 0,
        managementShare: 0,
        investorProfitShare: 0,
        investorTotalReturn: numInvestment,
        netReturn: 0,
        roi: 0,
        isValid: false
      };
    }

    const profit = numSellPrice - numCost;
    let managementShare = 0;
    let investorProfitShare = 0;

    if (profit > 0) {
      managementShare = profit * 0.70;
      investorProfitShare = profit * 0.30;
    } else {
      // Investor bears the full loss
      investorProfitShare = profit;
    }

    const investorTotalReturn = numInvestment + investorProfitShare;
    const netReturn = investorTotalReturn - numInvestment;
    const roi = numInvestment > 0 ? (netReturn / numInvestment) * 100 : 0;
    
    return {
      profit,
      managementShare,
      investorProfitShare,
      investorTotalReturn,
      netReturn,
      roi,
      isValid: true
    };
  }, [investment, cost, sellPrice]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <InputForm
              investment={investment}
              setInvestment={setInvestment}
              cost={cost}
              setCost={setCost}
              sellPrice={sellPrice}
              setSellPrice={setSellPrice}
            />
          </div>
          <div className="lg:col-span-3">
            <ResultsDisplay
              initialInvestment={parseFloat(investment) || 0}
              cost={parseFloat(cost) || 0}
              sellPrice={parseFloat(sellPrice) || 0}
              {...calculations}
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Investor BTB Dashboard. All rights reserved.</p>
      
      </footer>
    </div>
  );
};

export default App;