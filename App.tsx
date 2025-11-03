
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import { Project, User } from './types';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import { ALL_USERS, DEFAULT_PROJECT_DATA } from './mockData';



export interface InvestorResult {
  id: number;
  name: string;
  amount: number;
  individualProfitShare: number;
  payout: number;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'profile'>('dashboard');
  const [projectData, setProjectData] = useState<Project>(DEFAULT_PROJECT_DATA);
  

  const calculations = useMemo(() => {
    const { investors, cost, sellPrice } = projectData;
    const investorsNumeric = investors.map(inv => ({ ...inv, amount: parseFloat(inv.amount) || 0 }));
    const totalInvestment = investorsNumeric.reduce((sum, inv) => sum + inv.amount, 0);

    const numCost = parseFloat(cost) || 0;
    const numSellPrice = parseFloat(sellPrice) || 0;

    if (numCost === 0 || totalInvestment === 0) {
      return {
        profit: 0,
        managementShare: 0,
        investorProfitShare: 0,
        totalInvestment: totalInvestment,
        investorResults: investorsNumeric.map(inv => ({ ...inv, individualProfitShare: 0, payout: inv.amount })),
        netReturn: 0,
        roi: 0,
        isValid: false,
      };
    }

    const profit = numSellPrice - numCost;
    let managementShare = 0;
    let totalInvestorProfitShare = 0;

    if (profit > 0) {
      managementShare = profit * 0.70;
      totalInvestorProfitShare = profit * 0.30;
    } else {
      totalInvestorProfitShare = profit;
    }

    const investorResults = investorsNumeric.map(inv => {
      if (totalInvestment === 0) {
        return { id: inv.id, name: inv.name, amount: inv.amount, individualProfitShare: 0, payout: inv.amount };
      }
      const contributionRatio = inv.amount / totalInvestment;
      const individualProfitShare = totalInvestorProfitShare * contributionRatio;
      const payout = inv.amount + individualProfitShare;
      return { id: inv.id, name: inv.name, amount: inv.amount, individualProfitShare, payout };
    });

    const netReturn = totalInvestorProfitShare;
    const roi = totalInvestment > 0 ? (netReturn / totalInvestment) * 100 : 0;
    
    return {
      profit,
      managementShare,
      investorProfitShare: totalInvestorProfitShare,
      totalInvestment,
      investorResults,
      netReturn,
      roi,
      isValid: true,
    };
  }, [projectData]);

  const handleLogin = (mobileNumber: string, password: string):boolean => {
    const foundUser = ALL_USERS.find(
      u => u.mobileNumber === mobileNumber && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
  };

  const navigate = (page: 'dashboard' | 'profile') => {
    setCurrentPage(page);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }
  
  // Find the investor data related to the logged-in user, if they are an investor
  const investorData = user.role === 'investor' 
    ? projectData.investors.find(inv => inv.id === user.id)
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans antialiased">
      <Header user={user} onLogout={handleLogout} onNavigate={navigate} />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {currentPage === 'dashboard' && (
           <DashboardPage
            user={user}
            projectData={projectData}
            setProjectData={setProjectData}
            calculations={calculations}
           />
        )}
        {currentPage === 'profile' && (
          <ProfilePage user={user} investorData={investorData} onNavigate={navigate} />
        )}
      </main>
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} BTB-Investor ROI Dashboard. All rights reserved.</p>
        
      </footer>
    </div>
  );
};

export default App;
