"use client";
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/redux/stores/StoreProvider";
import { AuthProvider } from "@/redux/stores/AuthProvider";
import { Toaster } from "react-hot-toast";
import PageLoader from "@/components/PageLoader";
import { CartSheetProvider } from "@/app/context/CartSheetContext";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import './globals.css';

// Load Google Fonts
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased leading-relaxed ${geist.variable} ${geistMono.variable} ${rubik.variable} dark:bg-slate-950 dark:text-white bg-gray-50 text-gray-900`}
        style={{ fontFamily: "'Rubik', var(--font-rubik), sans-serif" }}
      >
        <SessionProvider>
          <NuqsAdapter>
            <StoreProvider>
              <AuthProvider>
                <CartSheetProvider>
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
                    <PageLoader />
                    {children}
                    <Toaster />
                  </ThemeProvider>
                </CartSheetProvider>
              </AuthProvider>
            </StoreProvider>
          </NuqsAdapter>
        </SessionProvider>
      </body>
    </html>
  );
}