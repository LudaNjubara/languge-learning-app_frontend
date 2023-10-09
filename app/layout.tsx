import Footer from "@components/common/footer";
import Header from "@components/common/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Language Learning App",
  description: "Learn a new language with this app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="container mx-auto min-h-screen px-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
