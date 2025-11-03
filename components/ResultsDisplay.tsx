import React from 'react';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
import type { User } from '@/types';
import type { InvestorResult } from '../App';


interface ResultsDisplayProps {
  cost: number;
  sellPrice: number;
  profit: number;
  managementShare: number;
  investorProfitShare: number;
  totalInvestment: number;
  investorResults: InvestorResult[];
  netReturn: number;
  roi: number;
  isValid: boolean;
  currency: string;
  user: User;
}

const ResultRow: React.FC<{ label: string; value: string; isHighlighted?: boolean; isPositive?: boolean; className?: string }> = ({ label, value, isHighlighted = false, isPositive, className = '' }) => (
  <div className={`flex justify-between items-center py-2 ${isHighlighted ? 'font-semibold' : ''} ${className}`}>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
    <p className={`text-sm
      ${isHighlighted && isPositive !== undefined ? (isPositive ? 'text-green-500' : 'text-red-500') : 'text-gray-900 dark:text-white'}
    `}>
      {value}
    </p>
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  totalInvestment,
  cost,
  sellPrice,
  profit,
  managementShare,
  investorProfitShare,
  investorResults,
  netReturn,
  roi,
  isValid,
  currency,
  user,
}) => {
  const isProfit = profit >= 0;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: currency,
    });
  };

  const visibleInvestorResults = user.role === 'management' 
    ? investorResults 
    : investorResults.filter(r => r.id === user.id);


  if (!isValid) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-center">Please enter valid investment, cost, and sell price to see results.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg h-full">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Performance Summary</h2>
      
      <div className="text-center my-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">Overall Return on Investment (ROI)</p>
        <div className={`flex items-center justify-center mt-2 ${netReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {netReturn >= 0 ? <ArrowUpIcon className="h-8 w-8" /> : <ArrowDownIcon className="h-8 w-8" />}
          <p className="text-5xl font-bold ml-2">{roi.toFixed(2)}%</p>
        </div>
      </div>
      
      <div className="space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-2">
            <h3 className="font-semibold text-lg mt-4 mb-2">Profit Breakdown</h3>
            <ResultRow label="Final Sell Price" value={formatCurrency(sellPrice)} />
            {/* FIX: Corrected a typo where 'format" + ' was prepended to the function call. */}
            <ResultRow label="Total Cost of Asset" value={formatCurrency(cost)} />
            <ResultRow label="Total Profit / Loss" value={formatCurrency(profit)} isHighlighted isPositive={isProfit} className="text-base" />
        </div>

        <div className="pt-2">
            <h3 className="font-semibold text-lg mt-4 mb-2">Share Distribution</h3>
            <ResultRow label="Management Share (70%)" value={formatCurrency(managementShare)} />
            <ResultRow label="Total Investor Share (30%)" value={formatCurrency(investorProfitShare)} isPositive={isProfit} />
        </div>
        
        <div className="pt-2">
            <h3 className="font-semibold text-lg mt-4 mb-2">Investor Returns</h3>
            <ResultRow label="Total Initial Investment" value={formatCurrency(totalInvestment)} />
            <ResultRow label="Total Net Return" value={formatCurrency(netReturn)} isHighlighted isPositive={netReturn >= 0} className="text-base" />

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-md mb-2 text-gray-700 dark:text-gray-200">
                  {user.role === 'management' ? 'Individual Payouts' : 'Your Payout'}
                </h4>
                <div className="space-y-3">
                    {visibleInvestorResults.map((result) => (
                    <div key={result.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{result.name}</p>
                        <ResultRow label="Investment" value={formatCurrency(result.amount)} />
                        <ResultRow label="Profit/Loss Share" value={formatCurrency(result.individualProfitShare)} isPositive={result.individualProfitShare >= 0} />
                        <ResultRow label="Total Payout" value={formatCurrency(result.payout)} isHighlighted isPositive={result.payout >= result.amount} />
                    </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;