import React from 'react';
import type { User, Investor } from '../types';

interface ProfilePageProps {
    user: User;
    investorData?: Investor;
    projectCurrency: string;
    onNavigate: (page: 'dashboard') => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, investorData, projectCurrency, onNavigate }) => {
    const isManagement = user.role === 'management';

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                {isManagement ? 'Management Profile' : 'Investor Profile'}
            </h2>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="font-semibold">Name:</span>
                    <span>{user.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="font-semibold">Role:</span>
                    <span className="capitalize">{user.role}</span>
                </div>
                 <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="font-semibold">Mobile Number:</span>
                    <span>{user.mobileNumber}</span>
                </div>
                {!isManagement && investorData && (
                     <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                        <span className="font-semibold">Your Investment:</span>
                        <span>
                            {parseFloat(investorData.amount || '0').toLocaleString('en-US', { 
                                style: 'currency', 
                                currency: projectCurrency 
                            })}
                        </span>
                    </div>
                )}

                <div className="pt-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Permissions</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {isManagement ? (
                            <>
                                <li>View all financial data and reports.</li>
                                <li>Edit all investment details.</li>
                                <li>Add or remove investors from the project.</li>
                                <li>Save project changes to the database.</li>
                            </>
                        ) : (
                            <>
                                <li>View personal investment performance.</li>
                                <li>Access to a read-only version of the dashboard.</li>
                                <li>Financial data cannot be modified.</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
