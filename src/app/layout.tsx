import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/custom/Nav";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Provider } from "jotai";
import { Toaster } from "@/components/ui/sonner";

const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Piplup",
  description: "AI based quiz platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <Provider>
          <body className={`${InterFont.className}  antialiased `}>
            <Nav />
            {children}
            <Toaster position="top-right" />
          </body>
        </Provider>
      </UserProvider>
    </html>
  );
}
