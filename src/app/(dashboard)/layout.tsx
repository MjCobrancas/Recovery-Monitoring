import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Recovery Plus | Monitoring",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex relative bg-[--bg-main] min-h-screen dark:bg-[--bg-dark-main] duration-300 print:overflow-hidden`}>
                <Header />
                <Sidebar />
                {children}
            </body>
        </html>
    );
}
