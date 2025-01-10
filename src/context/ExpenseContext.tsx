"use client";
import React, { createContext, useContext, useState } from 'react';

interface Expense {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    account: string;
    currency: string;
    quantity: number;
}

interface Account {
    id: string;
    name: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
    currency: string;
}

interface Income {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    account: string;
    currency: string;
    quantity: number;
}

interface ExpenseContextType {
    expenses: Expense[];
    accounts: Account[];
    income: Income[];
    addExpense: (expense: Expense) => void;
    addAccount: (account: Account) => void;
    updateAccount: (account: Account) => void;
    addIncome: (income: Income) => void;
    transferFunds: (fromAccount: string, toAccount: string, amount: number) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [income, setIncome] = useState<Income[]>([]);

    const generateId = () => Math.random().toString(36).slice(2, 11);

    const addExpense = (expense: Omit<Expense, 'id'>) => {
        const newExpense = { ...expense, id: generateId() };
        setExpenses((prev) => [...prev, newExpense]);
    };

    const addAccount = (account: Account) => {
        setAccounts((prev) => [...prev, account]);
    };

    const updateAccount = (account: Account) => {
        setAccounts((prevAccounts) => {
            return prevAccounts.map(acc => acc.id === account.id ? {...acc, balance: account.balance,
                updatedAt: new Date().toISOString()} : acc);
        });
    };

    const addIncome = (incomeItem: Omit<Income, 'id'>) => {
        const newIncome = { ...incomeItem, id: generateId() };
        setIncome((prev) => [...prev, newIncome]);
    };

    const transferFunds = (fromAccount: string, toAccount: string, amount: number) => {
        setAccounts((prevAccounts) => {
            const from = prevAccounts.find(acc => acc.name === fromAccount);
            const to = prevAccounts.find(acc => acc.name === toAccount);
            if (from && to && from.balance >= amount) {
                from.balance -= amount;
                to.balance += amount;
            }
            return [...prevAccounts];
        });
    };

    return (
        <ExpenseContext.Provider value={{ expenses, accounts, income, addExpense, addAccount, updateAccount, addIncome, transferFunds }}>
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
