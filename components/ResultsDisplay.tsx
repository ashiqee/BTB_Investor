
import React from 'react';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { ArrowDownIcon } from './icons/ArrowDownIcon';

interface ResultsDisplayProps {
  initialInvestment: number;
  cost: number;
  sellPrice: number;
  profit: number;
  managementShare: number;
  investorProfitShare: number;
  investorTotalReturn: number;
  netReturn: number;
  roi: number;
  isValid: boolean;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const ResultRow: React.FC<{ label: string; value: string; isHighlighted?: boolean; isPositive?: boolean }> = ({ label, value, isHighlighted = false, isPositive }) => (
  <div className={`flex justify-between items-center py-3 ${isHighlighted ? 'font-semibold' : ''}`}>
    <p className="text-gray-600 dark:text-gray-300">{label}</p>
    <p className={`
      ${isHighlighted && isPositive !== undefined ? (isPositive ? 'text-green-500' : 'text-red-500') : 'text-gray-900 dark:text-white'}
    `}>
      {value}
    </p>
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  initialInvestment,
  cost,
  sellPrice,
  profit,
  managementShare,
  investorProfitShare,
  investorTotalReturn,
  netReturn,
  roi,
  isValid,
}) => {
  const isProfit = profit >= 0;

  if (!isValid) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Please enter valid cost and sell price to see results.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg h-full">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Performance Summary</h2>
      
      {/* ROI Display */}
      <div className="text-center my-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">Return on Investment (ROI)</p>
        <div className={`flex items-center justify-center mt-2 ${netReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {netReturn >= 0 ? <ArrowUpIcon className="h-8 w-8" /> : <ArrowDownIcon className="h-8 w-8" />}
          <p className="text-5xl font-bold ml-2">{roi.toFixed(2)}%</p>
        </div>
      </div>
      
      <div className="space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
        {/* Profit Calculation */}
        <div className="pt-2">
            <h3 className="font-semibold text-lg mt-4 mb-2">Profit Breakdown</h3>
            <ResultRow label="Final Sell Price" value={formatCurrency(sellPrice)} />
            <ResultRow label="Total Cost of Asset" value={formatCurrency(cost)} />
            <ResultRow label="Total Profit / Loss" value={formatCurrency(profit)} isHighlighted isPositive={isProfit} />
        </div>

        {/* Share Distribution */}
        <div className="pt-2">
            <h3 className="font-semibold text-lg mt-4 mb-2">Share Distribution</h3>
            <ResultRow label="Management Share (70%)" value={formatCurrency(managementShare)} />
            <ResultRow label="Investor Share (30%)" value={formatCurrency(investorProfitShare)} isPositive={isProfit} />
        </div>
        
        {/* Investor Final Return */}
        <div className="pt-2">
            <h3 className="font-semibold text-lg mt-4 mb-2">Investor Return</h3>
            <ResultRow label="Initial Investment" value={formatCurrency(initialInvestment)} />
            <ResultRow label="Your Net Return" value={formatCurrency(netReturn)} isHighlighted isPositive={netReturn >= 0} />
            <ResultRow label="Total Payout to You" value={formatCurrency(investorTotalReturn)} isHighlighted isPositive={investorTotalReturn >= initialInvestment} />
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
