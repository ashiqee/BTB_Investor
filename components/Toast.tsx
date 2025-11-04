import React, { useEffect } from 'react';
import type { ToastMessage } from '../types';

interface ToastProps {
    toast: ToastMessage;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const isSuccess = toast.type === 'success';

    return (
        <div className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-xl text-white transition-transform transform animate-fade-in-up z-50
            ${isSuccess ? 'bg-green-500' : 'bg-red-500'}
        `}>
            <div className="flex items-center">
                <span className="font-semibold mr-2">{isSuccess ? 'Success!' : 'Error!'}</span>
                <p>{toast.message}</p>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Toast;
