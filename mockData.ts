
import type { User, Project } from './types';

// This file acts as a mock database for the frontend application.
// In a real application, this data would be fetched from a secure backend API.

export const ALL_USERS: User[] = [
    { 
        id: 101, 
        role: 'management', 
        name: 'Ashiq', 
        mobileNumber: '01614654397',
        password: '01614654397' 
    },
    { 
        id: 102, 
        role: 'management', 
        name: 'Jakir Chowdury', 
        mobileNumber: '01613243174',
        password: '01613243174' 
    },
    { 
        id: 1, 
        role: 'investor', 
        name: 'Mizanur Rahman', 
        mobileNumber: '1111111111',
        password: 'password123'
    },
    { 
        id: 2, 
        role: 'investor', 
        name: 'Ovaidul', 
        mobileNumber: '2222222222',
        password: 'password123'
    },
    { 
        id: 3, 
        role: 'investor', 
        name: 'Ashiq', 
        mobileNumber: '33333333',
        password: 'password123'
    },
];

export const DEFAULT_PROJECT_DATA: Project = {
    name: 'Main Investment Project',
    cost: '12000',
    sellPrice: '20000',
    currency: 'USD',
    investors: [
        { id: 1, name: 'Alice', amount: '10000' },
        { id: 2, name: 'Bob', amount: '5000' }
    ]
};
