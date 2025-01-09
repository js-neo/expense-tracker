import Link from 'next/link';
import React from "react";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Учет расходов и доходов</h1>
            <Link href="/expenses" className="text-blue-500 hover:underline">
                Перейти к расходам
            </Link>
        </div>
    );
};

export default Home;


