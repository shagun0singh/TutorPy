import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TutorPy - AI Python Learning Tutor",
  description: "Master Python with AI-powered step-by-step guidance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full m-0 p-0 bg-black`}>{children}</body>
    </html>
  );
}

