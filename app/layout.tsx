import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/redux/stores/StoreProvider";
import { AuthProvider } from "@/redux/stores/AuthProvider";
import { Toaster } from "react-hot-toast";
import PageLoader from "@/components/PageLoader";

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

export const metadata: Metadata = {
  title: "Big Store",
  description: "Welcome to the Big Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased leading-relaxed ${geist.variable} ${geistMono.variable} ${rubik.variable} dark:bg-slate-950 dark:text-white bg-gray-50 text-gray-900`}
        style={{ fontFamily: "'Rubik', var(--font-rubik), sans-serif" }}
      >
        <StoreProvider>
          <AuthProvider>
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
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
