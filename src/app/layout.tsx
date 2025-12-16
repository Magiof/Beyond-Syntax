import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { trackData } from "@/data/curriculumData";
import { Menu } from "lucide-react";

export const metadata: Metadata = {
  title: "Beyond Syntax: Depth First Learning",
  description: "A deep dive into Java, Kotlin, and Spring",
  icons: {
    icon: "/brand/logo.png",
    shortcut: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="flex h-screen overflow-hidden bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 antialiased">
        {/* Sidebar - Fixed on desktop */}
        <div className="hidden lg:block fixed inset-y-0 left-0 z-50">
           <Sidebar tracks={trackData} />
        </div>

        {/* Mobile Sidebar Overlay/Button logic would go here or be handled by a client wrapper.
            For MVP migration, we stick to Desktop-first but 'lg:ml-72' for main content 
        */}
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-white lg:ml-72 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
