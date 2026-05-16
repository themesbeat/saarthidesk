import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaarthiDesk | AI Employee for Customer Conversations",
  description: "Manage WhatsApp, Instagram, email, and website chats from one intelligent inbox.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body
        className="antialiased selection:bg-indigo-500/30"
      >
        {children}
      </body>
    </html>
  );
}
