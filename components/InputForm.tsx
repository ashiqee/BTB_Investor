
import React from 'react';
import { CurrencyIcon } from './icons/CurrencyIcon';
import type { User, Project, Investor } from '@/types';

interface InputFormProps {
  projectData: Project;
  setProjectData: React.Dispatch<React.SetStateAction<Project>>;
  user: User;
}

const InputForm: React.FC<InputFormProps> = ({
  projectData,
  setProjectData,
  user
}) => {
  const isManagement = user.role === 'management';
  const { investors, cost, sellPrice, currency } = projectData;

  const handleProjectDataChange = (field: keyof Project, value: string) => {
    if (field === 'cost' || field === 'sellPrice') {
       if (!/^\d*\.?\d*$/.test(value)) return;
    }
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const handleInvestorChange = (id: number, field: 'name' | 'amount', value: string) => {
    if (field === 'amount' && !/^\d*\.?\d*$/.test(value)) {
      return;
    }
    const updatedInvestors = investors.map(inv => 
      inv.id === id ? { ...inv, [field]: value } : inv
    );
    setProjectData(prev => ({ ...prev, investors: updatedInvestors }));
  };

  const addInvestor = () => {
    // Find a new unique ID that isn't already in use
    const existingIds = new Set(investors.map(i => i.id));
    let newId = Date.now();
    while (existingIds.has(newId)) {
        newId++;
    }

    const newInvestor: Investor = { 
        id: newId, 
        name: `Investor ${investors.length + 1}`, 
        amount: '' 
    };
    setProjectData(prev => ({ ...prev, investors: [...prev.investors, newInvestor] }));
  };

  const removeInvestor = (id: number) => {
    setProjectData(prev => ({ ...prev, investors: prev.investors.filter(inv => inv.id !== id) }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg h-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Investment Details</h2>
      <div className="space-y-6">
        <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Currency
            </label>
            <select
                id="currency"
                value={currency}
                onChange={(e) => handleProjectDataChange('currency', e.target.value)}
                disabled={!isManagement}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="BDT">BDT - Bangladeshi Taka</option>
            </select>
        </div>

        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Initial Investments
            </label>
            {investors.map((investor) => (
                <div key={investor.id} className="flex items-center gap-2">
                    <input
                        type="text"
                        aria-label={`Investor ${investor.name} name`}
                        value={investor.name}
                        onChange={(e) => handleInvestorChange(investor.id, 'name', e.target.value)}
                        className="w-2/5 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed"
                        placeholder="Investor Name"
                        disabled={!isManagement}
                    />
                    <div className="relative flex-grow">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <CurrencyIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            aria-label={`Investor ${investor.name} investment amount`}
                            value={investor.amount}
                            onChange={(e) => handleInvestorChange(investor.id, 'amount', e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed"
                            placeholder="Amount"
                            disabled={!isManagement}
                        />
                    </div>
                    {isManagement && investors.length > 1 && (
                        <button 
                            onClick={() => removeInvestor(investor.id)} 
                            className="p-2 text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label={`Remove Investor ${investor.name}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    )}
                </div>
            ))}
            {isManagement && (
                <button
                    onClick={addInvestor}
                    className="w-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700/50 font-medium rounded-md py-2 transition-colors text-sm"
                >
                    + Add Another Investor
                </button>
            )}
        </div>
        
        <hr className="border-gray-200 dark:border-gray-700"/>

        <div>
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Total Cost of Asset
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <CurrencyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="cost"
              value={cost}
              onChange={(e) => handleProjectDataChange('cost', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed"
              placeholder="e.g., 12000"
              disabled={!isManagement}
            />
          </div>
        </div>
        <div>
          <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Final Sell Price
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <CurrencyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="sellPrice"
              value={sellPrice}
              onChange={(e) => handleProjectDataChange('sellPrice', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed"
              placeholder="e.g., 20000"
              disabled={!isManagement}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
