"use client";
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useExpenseContext } from '@/context/ExpenseContext';

const Diagram: React.FC = () => {
    const { expenses } = useExpenseContext();

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const data = expenses.reduce((acc, expense) => {
        const existing = acc.find(item => item.name === expense.category);
        if (existing) {
            existing.value += expense.amount;
        } else {
            acc.push({ name: expense.category, value: expense.amount });
        }
        return acc;
    }, [] as { name: string; value: number; }[]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FFBB28'];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Статистика расходов</h1>
            {data.length === 0 ? (
                <p>Нет данных для отображения.</p>
            ) : (
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
                    <Tooltip content={({ payload }) => {
                        if (payload && payload.length > 0) {
                            const value = Number(payload[0]?.value);
                            if (!isNaN(value) && totalExpenses > 0) {
                                const percentage = ((value / totalExpenses) * 100).toFixed(2);
                                return (
                                    <div>
                                        <p>{payload[0]?.name}: {value} ₽</p>
                                        <p>Процент от общего: {percentage}%</p>
                                    </div>
                                );
                            }
                        }
                        return null;
                    }} />
                    <Legend />
                </PieChart>
            )}
        </div>
    );
};

export default Diagram;
