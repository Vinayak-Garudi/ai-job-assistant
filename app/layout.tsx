import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import { SidebarProvider } from "@/components/sidebar/SidebarContext";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { MainContent } from "@/components/sidebar/MainContent";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SidebarProvider>
            <Navigation />
            <Sidebar />
            <MainContent>{children}</MainContent>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
