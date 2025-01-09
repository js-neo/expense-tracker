
"use client";
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useExpenseContext } from '@/context/ExpenseContext';

const Graphs: React.FC = () => {
    const { expenses } = useExpenseContext();

    const data = expenses.reduce((acc, expense) => {
        const existing = acc.find(item => item.name === expense.category);
        if (existing) {
            existing.value += expense.amount;
        } else {
            acc.push({ name: expense.category, value: expense.amount });
        }
        return acc;
    }, [] as { name: string; value: number; }[]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Статистика расходов</h1>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default Graphs;
