import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Summaryy - AI-Powered Summary Generator",
  description:
    "Summaryy is an AI-powered summary generator that helps you quickly summarize any text, article, or document. Save time and get the key points with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="realtive flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
        {children}
        </main>
        <Footer />
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
