
import React from 'react';
import InputForm from '../components/InputForm';
import ResultsDisplay from '../components/ResultsDisplay';

import type { InvestorResult } from '../App';
import { Project, User } from '@/types';

interface DashboardPageProps {
    user: User;
    projectData: Project;
    setProjectData: React.Dispatch<React.SetStateAction<Project>>;
    calculations: {
        profit: number;
        managementShare: number;
        investorProfitShare: number;
        totalInvestment: number;
        investorResults: InvestorResult[];
        netReturn: number;
        roi: number;
        isValid: boolean;
    };
}

const DashboardPage: React.FC<DashboardPageProps> = (props) => {
    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
                <InputForm
                    user={props.user}
                    projectData={props.projectData}
                    setProjectData={props.setProjectData}
                />
            </div>
            <div className="lg:col-span-3">
                <ResultsDisplay
                    user={props.user}
                    currency={props.projectData.currency}
                    cost={parseFloat(props.projectData.cost) || 0}
                    sellPrice={parseFloat(props.projectData.sellPrice) || 0}
                    totalInvestment={props.calculations.totalInvestment}
                    {...props.calculations}
                />
            </div>
        </div>
    );
};

export default DashboardPage;
