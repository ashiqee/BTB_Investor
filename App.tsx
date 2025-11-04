import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

import { loginUser, getProjectData, updateProjectData } from './api/googleSheets';
import type { User, Project, Investor, ToastMessage } from './types';
import { Spinner } from './components/Spinner';
import Toast from './components/Toast';


// A simple deep equality check function to avoid external dependencies.
function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (obj1 && typeof obj1 === 'object' && obj2 && typeof obj2 === 'object') {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

    for (const key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
      }
    }
    return true;
  }
  return false;
}


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
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [originalProjectData, setOriginalProjectData] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const isDirty = useMemo(() => {
    if (!projectData || !originalProjectData) return false;
    return !deepEqual(projectData, originalProjectData);
  }, [projectData, originalProjectData]);
  

  const calculations = useMemo(() => {
    if (!projectData) {
       return {
        profit: 0, managementShare: 0, investorProfitShare: 0, totalInvestment: 0,
        investorResults: [], netReturn: 0, roi: 0, isValid: false,
      };
    }

    const { investors, cost, sellPrice } = projectData;
    const investorsNumeric = investors.map(inv => ({ ...inv, amount: parseFloat(inv.amount as string) || 0 }));
    const totalInvestment = investorsNumeric.reduce((sum, inv) => sum + inv.amount, 0);

    const numCost = parseFloat(cost as string) || 0;
    const numSellPrice = parseFloat(sellPrice as string) || 0;

    if (numCost === 0 || totalInvestment === 0 || numSellPrice === 0) {
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

  const handleLogin = async (mobileNumber: string, password: string): Promise<boolean> => {
    const foundUser = await loginUser(mobileNumber, password);
    if (foundUser) {
      setUser(foundUser);
      setIsLoading(true);
      try {
        const data = await getProjectData();
        setProjectData(data);
        setOriginalProjectData(data); // Set the baseline for changes
        setCurrentPage('dashboard');
      } catch (error) {
        console.error("Failed to fetch project data:", error);
        setToast({ message: 'Failed to load project data.', type: 'error' });
      } finally {
        setIsLoading(false);
      }
      return true;
    }
    return false;
  };

  const handleSave = async () => {
    if (!projectData || user?.role !== 'management' || !isDirty) return;
    setIsSaving(true);
    try {
      const response = await updateProjectData(projectData);
      if (response.success) {
        setToast({ message: response.message, type: 'success' });
        setOriginalProjectData(projectData); // Update original state to remove "dirty" status
      } else {
        setToast({ message: response.message || 'An error occurred.', type: 'error' });
      }
    } catch (error) {
       setToast({ message: 'Failed to save changes.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setProjectData(null);
    setOriginalProjectData(null);
  };

  const navigate = (page: 'dashboard' | 'profile') => {
    setCurrentPage(page);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }
  
  if (isLoading || !projectData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
            <Spinner className="h-12 w-12 text-blue-500 mx-auto" />
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading Project Data...</p>
        </div>
      </div>
    )
  }
  
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
            isSaving={isSaving}
            isDirty={isDirty}
            onSave={handleSave}
           />
        )}
        {currentPage === 'profile' && (
          <ProfilePage 
            user={user} 
            investorData={investorData} 
            projectCurrency={projectData.currency}
            onNavigate={navigate} 
          />
        )}
      </main>
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Investor ROI Dashboard. All rights reserved.</p>
        <p className="mt-1">Disclaimer: This is for illustrative purposes only.</p>
      </footer>
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
