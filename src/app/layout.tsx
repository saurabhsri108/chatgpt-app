import type { Metadata } from "next";
import { Bokor, Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const bokor = Bokor({
  variable: "--font-bokor",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "NextJS for ChatGPT",
  description: "Brought to you by NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bokor.variable} font-sans antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
