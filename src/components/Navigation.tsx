"use client";

import React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation: React.FC = () => {
    const pathname = usePathname();

    const getLinkClasses = (path: string) => {
        return `mr-2 ${pathname === path ? 'bg-blue-500 text-white' : 'text-black'}`;
    };

    return (
        <nav className="flex justify-start p-4">
            <Link href="/" className={getLinkClasses('/')}>
                Главная
            </Link>
            <Link href="/expenses" className={getLinkClasses('/expenses')}>
                Ввод расходов
            </Link>
            <Link href="/graphs" className={getLinkClasses('/graphs')}>
                График
            </Link>
        </nav>
    );
};

export default Navigation;
