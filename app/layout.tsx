"use client";
import "./globals.css";
import { RecoilRoot } from "recoil";
import Navbar from "@/components/Navbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-[100%]">
      <body
      >
        <RecoilRoot>
          <Navbar/>
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
