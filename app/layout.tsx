import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import { SidebarProvider } from "@/components/sidebar/SidebarContext";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { MainContent } from "@/components/sidebar/MainContent";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Job Assistant",
  description:
    "Streamline your job search with intelligent matching powered by AI",
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const isAuthenticated = headerStore.get("x-is-authenticated") === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SidebarProvider>
            <ThemeSwitcher />
            <Navigation />
            <Sidebar />
            <MainContent isAuthenticated={isAuthenticated}>
              {children}
            </MainContent>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
