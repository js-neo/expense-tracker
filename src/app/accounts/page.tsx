"use client";
import React, {useState} from 'react';
import {useExpenseContext} from '@/context/ExpenseContext';
import generateId from '@/utils/generateId';

interface Account {
    id: string;
    name: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
    currency: string;
}

const Accounts: React.FC = () => {
    const {addAccount, accounts} = useExpenseContext();
    const [name, setName] = useState<string>('');
    const [balance, setBalance] = useState<string>('');
    const [createdAt, setCreatedAt] = useState<string>('');
    const [currency, setCurrency] = useState<string>('₽');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleAddAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newAccount: Account = {
            id: generateId(),
            name,
            balance: parseFloat(balance),
            createdAt,
            currency,
            updatedAt: new Date().toISOString()
        };

        const existingAccountIndex = accounts.findIndex(acct => acct.name === name);
        if (existingAccountIndex !== -1) {
            setErrorMessage('Счет с таким именем уже существует.');
            return;
        } else {
            addAccount(newAccount);
        }

        setName('');
        setBalance('');
        setCreatedAt('');
        setCurrency('₽');
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'long', year: 'numeric'};
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', options);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Счета</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleAddAccount} className="mb-4 grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2"
                />
                <input
                    type="number"
                    placeholder="Стартовый баланс"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    required
                    className="border p-2"
                />
                <input
                    type="date"
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
                    required
                    className="border p-2"
                />
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="border p-2"
                >
                    <option value="₽">Рубль</option>
                    <option value="$">Доллар</option>
                    <option value="€">Евро</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 col-span-2">
                    Добавить счет
                </button>
            </form>

            {accounts.length === 0 ? (
                <p>Нет счетов для отображения.</p>
            ) : (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Список счетов:</h2>
                    <ul className="list-disc pl-5">
                        {accounts.map((account) => (
                            <li key={account.id} className="mb-2">
                                <strong>{account.name}</strong> - {account.balance} {account.currency}
                                (Создан: {formatDate(account.createdAt)}, Последнее
                                обновление: {formatDate(account.updatedAt)})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Accounts;
