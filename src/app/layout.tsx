import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ChatWidget from '@/components/features/chat/ChatWidget';

const inter = Inter({ subsets: [ "latin" ], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Synapse - Where Minds Connect",
  description: "Synapse is a modern discussion forum where communities share and explore knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={ cn("min-h-screen bg-background font-sans antialiased", inter.variable) }>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            { children }
            <ChatWidget />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
