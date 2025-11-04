import React from 'react';
import InputForm from '../components/InputForm';
import ResultsDisplay from '../components/ResultsDisplay';
import type { User, Project } from '../types';
import type { InvestorResult } from '../App';

interface DashboardPageProps {
    user: User;
    projectData: Project;
    setProjectData: React.Dispatch<React.SetStateAction<Project | null>>;
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
    isSaving: boolean;
    isDirty: boolean;
    onSave: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = (props) => {
    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
                <InputForm
                    user={props.user}
                    projectData={props.projectData}
                    setProjectData={props.setProjectData as React.Dispatch<React.SetStateAction<Project>>}
                    isSaving={props.isSaving}
                    isDirty={props.isDirty}
                    onSave={props.onSave}
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
