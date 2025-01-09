"use client";
import React, { useState } from 'react';

interface Expense {
    description: string;
    amount: number;
}

const Expenses: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    const addExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newExpense: Expense = { description, amount: parseFloat(amount) };
        setExpenses([...expenses, newExpense]);
        setDescription('');
        setAmount('');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Расходы</h1>
            <form onSubmit={addExpense} className="mb-4">
                <input
                    type="text"
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Сумма"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Добавить расход
                </button>
            </form>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index} className="mb-2">
                        {expense.description}: {expense.amount} ₽
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenses;
