import type { User, Project } from '../types';

// This file simulates a backend API that interacts with a Google Sheet.
// The data is hardcoded here, but the functions use async/await and timeouts
// to mimic real network latency. This represents a modern approach where
// a frontend might call a service (like a Gemini API backend) that has
// tools to interact with Google Sheets.

const ALL_USERS: User[] = [
    { 
        id: 101, 
        role: 'management', 
        name: 'Ashiq Mahmud', 
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
        name: 'Alice', 
        mobileNumber: '1111111111',
        password: 'password123'
    },
    { 
        id: 2, 
        role: 'investor', 
        name: 'Bob', 
        mobileNumber: '2222222222',
        password: 'password123'
    },
];

// This represents the single source of truth for project data, as if it were a row or a dedicated sheet.
let PROJECT_DATA: Project = {
    name: 'Main Investment Project',
    cost: '12000',
    sellPrice: '20000',
    currency: 'BDT',
    investors: [
        { id: 1, name: 'Alice', amount: '10000' },
        { id: 2, name: 'Bob', amount: '5000' }
    ]
};

// Simulate a network delay
const networkDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulates logging in a user by checking credentials against the "Users" sheet.
 */
export const loginUser = async (mobileNumber: string, password: string): Promise<User | null> => {
    await networkDelay(1000);
    const foundUser = ALL_USERS.find(
      u => u.mobileNumber === mobileNumber && u.password === password
    );
    if (foundUser) {
        // In a real app, never send the password back to the client.
        const { password, ...userWithoutPassword } = foundUser;
        return userWithoutPassword as User;
    }
    return null;
};

/**
 * Simulates fetching the entire project data from the "ProjectData" sheet.
 */
export const getProjectData = async (): Promise<Project> => {
    await networkDelay(1500);
    // Return a deep copy to prevent direct state mutation from affecting our "database"
    return JSON.parse(JSON.stringify(PROJECT_DATA));
};

/**
 * Simulates updating the project data in the "ProjectData" sheet.
 */
export const updateProjectData = async (newData: Project): Promise<{ success: boolean; message: string }> => {
    await networkDelay(2000);
    // In a real scenario, you might have validation here.
    PROJECT_DATA = JSON.parse(JSON.stringify(newData)); // "Save" the data
    return { success: true, message: 'Project data saved successfully.' };
};
