import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PersonaProvider } from "@/components/PersonaProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krishna Kapoor | AI Engineer & Creative Technologist",
  description: "Building intelligent systems, secure platforms, and immersive 3D experiences.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}>
        <ThemeProvider
             attribute="class"
             defaultTheme="dark"
             enableSystem={false}
             disableTransitionOnChange
        >
          <PersonaProvider>
            {children}
          </PersonaProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
