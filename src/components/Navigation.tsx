"use client";

import React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation: React.FC = () => {
    const pathname = usePathname();

    const getLinkClasses = (path: string) => {
        return `mr-2 ${pathname === path ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-black'}`;
    };

    return (
        <nav className="flex justify-start p-4">
            <Link href="/" className={getLinkClasses('/')}>
                Главная
            </Link>
            <Link href="/accounts" className={getLinkClasses('/accounts')}>
                Счета
            </Link>
            <Link href="/income" className={getLinkClasses('/income')}>
                Доходы
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
