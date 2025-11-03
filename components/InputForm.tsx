
import React from 'react';
import { CurrencyIcon } from './icons/CurrencyIcon';

interface InputFormProps {
  investment: string;
  setInvestment: (value: string) => void;
  cost: string;
  setCost: (value: string) => void;
  sellPrice: string;
  setSellPrice: (value: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  investment,
  setInvestment,
  cost,
  setCost,
  sellPrice,
  setSellPrice,
}) => {
  
  const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
        setter(value);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg h-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Investment Details</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="investment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Initial Investment
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <CurrencyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="investment"
              value={investment}
              onChange={handleInputChange(setInvestment)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., 10000"
            />
          </div>
        </div>
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
              onChange={handleInputChange(setCost)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., 12000"
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
              onChange={handleInputChange(setSellPrice)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., 20000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
