"use client";
import "./globals.css";
import { RecoilRoot } from "recoil";




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
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
