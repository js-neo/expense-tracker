
"use client";
import React, {useEffect, useState} from 'react';
import { useExpenseContext } from '@/context/ExpenseContext';

const Expenses: React.FC = () => {
    const { expenses, addExpense } = useExpenseContext();
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('Продукты');

    useEffect(() =>
        console.log("expenses: ", expenses), [expenses]
    )

    const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newExpense = { description, amount: parseFloat(amount), category };
        addExpense(newExpense);
        setDescription('');
        setAmount('');
        setCategory('Продукты');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Расходы</h1>
            <form onSubmit={handleAddExpense} className="mb-4">
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
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 mr-2"
                >
                    <option value="Продукты">Продукты</option>
                    <option value="Развлечения">Развлечения</option>
                    <option value="Зарплата">Зарплата</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Добавить расход
                </button>
            </form>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index} className="mb-2">
                        {expense.description}: {expense.amount} ₽ (Категория: {expense.category})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenses;
