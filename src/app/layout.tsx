import React from "react";
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {ExpenseProvider} from "@/context/ExpenseContext";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Учет расходов и доходов",
    description: "Приложение для учета расходов и доходов.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        ><ExpenseProvider>
            <Navigation/>
            <div className="min-h-screen flex flex-col items-center justify-center">
                {children}
            </div>
        </ExpenseProvider>
        </body>
        </html>
    );
}
