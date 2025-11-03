
import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: (mobileNumber: string, password: string) => boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!mobileNumber || !password) {
            setError('Please enter both mobile number and password.');
            return;
        }
        const success = onLogin(mobileNumber, password);
        if (!success) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                        BTB Investor ROI Dashboard
                    </h1>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                        Please sign in to continue.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label 
                                htmlFor="mobile" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="e.g., 0000000000"
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="••••••••"
                            />
                        </div>
                        
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                        >
                            Login
                        </button>
                    </form>
                </div>
                
            </div>
        </div>
    );
};

export default LoginPage;
