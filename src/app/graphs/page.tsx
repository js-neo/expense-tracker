"use client";
import React, { useState } from 'react';
import Diagram from '@/components/Diagram';
import IncomeExpenseGraph from '@/components/IncomeExpenseGraph';

const GraphsPage: React.FC = () => {
    const [view, setView] = useState<'pie' | 'line'>('pie');

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Графики</h1>
            <div className="mb-4">
                <button
                    onClick={() => setView('pie')}
                    className={`mr-2 p-2 ${view === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Создать диаграмму
                </button>
                <button
                    onClick={() => setView('line')}
                    className={`p-2 ${view === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Создать график
                </button>
            </div>

            {view === 'pie' && <Diagram />}
            {view === 'line' && <IncomeExpenseGraph />}
        </div>
    );
};

export default GraphsPage;
