import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const inter = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boat Note",
  description: "Just write down your thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-pattern -z-50 inset-0 absolute bg-repeat bg-center opacity-[0.01]" />
        {children}
      </body>
    </html>
  );
}
