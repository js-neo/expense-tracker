"use client"
import React, { createContext, useContext, useState } from 'react';

interface Expense {
    description: string;
    amount: number;
    category: string;
}

interface ExpenseContextType {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const addExpense = (expense: Expense) => {
        setExpenses((prev) => [...prev, expense]);
    };

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpenseContext = () => {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error('useExpenseContext must be used within an ExpenseProvider');
    }
    return context;
};
