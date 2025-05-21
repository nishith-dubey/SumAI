import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Sans_3 as FontSans   } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SumAI - AI Powered PDF Summarizer",
  description: "SumAI is an app for summarizing PDF documents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" className=" flex flex-col">
      <body
        className={`font-sans ${fontSans.variable} antialiased  flex flex-col`}
      > 
        <Navbar/>
        <main className="min-h-screen flex-1">{children}</main>
        <Footer/>
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
