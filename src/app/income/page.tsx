"use client";
import React, {useEffect, useState} from 'react';
import { useExpenseContext } from '@/context/ExpenseContext';
import generateId from '@/utils/generateId';

const Income: React.FC = () => {
    const { addIncome, accounts, updateAccount, income } = useExpenseContext();
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [account, setAccount] = useState<string>('');
    const [currency, setCurrency] = useState<string>('₽');
    const [quantity, setQuantity] = useState<number>(1);
    const [category, setCategory] = useState<string>('Аренда');

    useEffect(() => {
        console.log("accounts: ", accounts);
    }, [accounts])

    const handleAddIncome = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newIncome = { id: generateId(), description, amount: parseFloat(amount), date, account, currency, quantity, category };

        addIncome(newIncome);

        const selectedAccount = accounts.find(acct => acct.name === account);
        if (selectedAccount) {
            const updatedAccount = { ...selectedAccount, balance: selectedAccount.balance + parseFloat(amount) };
            updateAccount(updatedAccount);
        }

        setDescription('');
        setAmount('');
        setDate('');
        setAccount('');
        setCurrency('₽');
        setQuantity(1);
        setCategory('Аренда');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Доходы</h1>
            <form onSubmit={handleAddIncome} className="mb-4 grid grid-cols-2 gap-4">
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
                    <option value="Аренда">Аренда</option>
                    <option value="Зарплата">Зарплата</option>
                    <option value="Семья">Семья</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 col-span-2">
                    Добавить доход
                </button>
            </form>
            <ul>
                {income.map((inc) => (
                    <li key={inc.id} className="mb-2">
                        {inc.description}: {inc.amount} {inc.currency} (Категория: {inc.category}, Счет: {inc.account}, Дата: {inc.date})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Income;
