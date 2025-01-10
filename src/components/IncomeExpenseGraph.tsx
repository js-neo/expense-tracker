"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useExpenseContext } from '@/context/ExpenseContext';

const IncomeExpenseGraph: React.FC = () => {
    const { income, expenses } = useExpenseContext();

    const dataMap: { [key: string]: { income: number; expense: number; incomeDescriptions: string[];
        expenseDescriptions: string[]; incomeCategories: string[] } } = {};

    income.forEach(item => {
        const date = item.date;
        if (!dataMap[date]) {
            dataMap[date] = { income: 0, expense: 0, incomeDescriptions: [], expenseDescriptions: [], incomeCategories: [] };
        }
        dataMap[date].income += item.amount;
        dataMap[date].incomeDescriptions.push(item.description);
        dataMap[date].incomeCategories.push(item.category); // Добавление категории
    });

    expenses.forEach(item => {
        const date = item.date;
        if (!dataMap[date]) {
            dataMap[date] = { income: 0, expense: 0, incomeDescriptions: [], expenseDescriptions: [], incomeCategories: [] };
        }
        dataMap[date].expense += item.amount;
        dataMap[date].expenseDescriptions.push(item.description);
    });

    const data = Object.keys(dataMap).map(date => ({
        date,
        income: dataMap[date].income,
        expense: dataMap[date].expense,
        incomeDescriptions: dataMap[date].incomeDescriptions.join(', '),
        expenseDescriptions: dataMap[date].expenseDescriptions.join(', '),
        incomeCategories: [...new Set(dataMap[date].incomeCategories)].join(', '),
    }));

    return (
        <div className="p-4">
            <LineChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={({ payload }) => {
                    if (payload && payload.length) {
                        return (
                            <div>
                                <p>Date: {payload[0].payload.date}</p>
                                <p>Income: {payload[0].value} ₽</p>
                                <p>Expense: {payload[1].value} ₽</p>
                                <p>Income Descriptions: {payload[0].payload.incomeDescriptions}</p>
                                <p>Expense Descriptions: {payload[1].payload.expenseDescriptions}</p>
                                <p>Income Categories: {payload[0].payload.incomeCategories}</p>
                            </div>
                        );
                    }
                    return null;
                }} />
                <Line type="monotone" dataKey="income" stroke="#82ca9d" />
                <Line type="monotone" dataKey="expense" stroke="#ff7300" />
            </LineChart>
        </div>
    );
};

export default IncomeExpenseGraph;
