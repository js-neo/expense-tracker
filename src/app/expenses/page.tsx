"use client";
import React, { useEffect, useState } from 'react';
import { useExpenseContext } from '@/context/ExpenseContext';
import generateId from '@/utils/generateId';

const Expenses: React.FC = () => {
    const { expenses, addExpense, accounts } = useExpenseContext();
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('Продукты');
    const [date, setDate] = useState<string>('');
    const [account, setAccount] = useState<string>('');
    const [currency, setCurrency] = useState<string>('₽');
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        console.log("expenses: ", expenses);
    }, [expenses]);

    const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newExpense = { id: generateId(), description, amount: parseFloat(amount), category, date, account, currency, quantity };
        addExpense(newExpense);
        setDescription('');
        setAmount('');
        setCategory('Продукты');
        setDate('');
        setAccount('');
        setCurrency('₽');
        setQuantity(1);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Расходы</h1>
            <form onSubmit={handleAddExpense} className="mb-4 grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="border p-2"
                />
                <input
                    type="number"
                    placeholder="Сумма"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="border p-2"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="border p-2"
                />
                <select
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    className="border p-2"
                    required
                >
                    <option value="">Выберите счет</option>
                    {accounts.map((acct) => (
                        <option key={acct.id} value={acct.name}>
                            {acct.name} - {acct.balance} {acct.currency}
                        </option>
                    ))}
                </select>
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="border p-2"
                    required
                >
                    <option value="₽">₽</option>
                    <option value="$">$</option>
                    <option value="€">€</option>
                </select>
                <input
                    type="number"
                    placeholder="Количество"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    required
                    className="border p-2"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2"
                    required
                >
                    <option value="Продукты">Продукты</option>
                    <option value="Хозяйственные товары">Хозяйственные товары</option>
                    <option value="Транспорт">Транспорт</option>
                    <option value="Одежда">Одежда</option>
                    <option value="Обувь">Обувь</option>
                    <option value="Техника">Техника</option>
                    <option value="Услуги">Услуги</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 col-span-2">
                    Добавить расход
                </button>
            </form>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id} className="mb-2">
                        {expense.description}: {expense.amount} {expense.currency} (Категория: {expense.category},
                        Счет: {expense.account}, Дата: {expense.date})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenses;
