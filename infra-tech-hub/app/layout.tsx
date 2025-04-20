import { Header, Footer } from "@/components/layout";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infra Tech Hub - TCPレベル判定君",
  description: "ネットワークスキルを測定・向上できるクイズプラットフォーム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}