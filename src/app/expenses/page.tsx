"use client";
import React, { useEffect, useState } from 'react';
import { useExpenseContext } from '@/context/ExpenseContext';
import generateId from '@/utils/generateId';

const Expenses: React.FC = () => {
    const { expenses, addExpense, updateAccount, accounts } = useExpenseContext();
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0); // Изменено на число
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
        const newExpense = { id: generateId(), description, amount, category, date, account, currency, quantity };
        addExpense(newExpense);

        const selectedAccount = accounts.find(acct => acct.name === account);
        if (selectedAccount) {
            const updatedAccount = { ...selectedAccount, balance: selectedAccount.balance - amount };
            updateAccount(updatedAccount);
        }


        setDescription('');
        setAmount(0);
        setCategory('Продукты');
        setDate('');
        setAccount('');
        setCurrency('₽');
        setQuantity(1);
    };

    const handleQuantityChange = (value: number) => {
        setQuantity(value);
        setAmount(value * parseFloat((amount || 0).toString()));
    };

    const handlePriceChange = (value: string) => {
        const price = parseFloat(value);
        setAmount(quantity * price);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Расходы</h1>
            <form onSubmit={handleAddExpense} className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1">Описание</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block mb-1">Количество</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block mb-1">Цена</label>
                    <input
                        type="number"
                        onChange={(e) => handlePriceChange(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block mb-1">Сумма</label>
                    <input
                        type="number"
                        value={amount}
                        readOnly
                        className="border p-2 w-full bg-gray-200"
                    />
                </div>
                <div>
                    <label className="block mb-1">Валюта</label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="border p-2 w-full"
                        required
                    >
                        <option value="₽">₽</option>
                        <option value="$">$</option>
                        <option value="€">€</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Счет</label>
                    <select
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        className="border p-2 w-full"
                        required
                    >
                        <option value="">Выберите счет</option>
                        {accounts.map((acct) => (
                            <option key={acct.id} value={acct.name}>
                                {acct.name} - {acct.balance} {acct.currency}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Категория</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 w-full"
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
                </div>
                <div>
                    <label className="block mb-1">Дата</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>

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
