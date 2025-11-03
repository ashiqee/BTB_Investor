
export interface Investor {
  id: number;
  name: string;
  amount: string;
}

export interface User {
  id: number;
  role: 'management' | 'investor';
  name: string;
  mobileNumber: string;
  password?: string; // Password should not be stored in client-side state long-term
}

export interface Project {
    name: string;
    cost: string;
    sellPrice: string;
    currency: string;
    investors: Investor[];
}
