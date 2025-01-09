import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

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
        >
        <div className="min-h-screen flex flex-col items-center justify-center">
            {children}
        </div>
        </body>
        </html>
    );
}
