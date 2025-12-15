import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { LightModeBackground } from "@/components/ui/light-mode-background";
import { CursorFollower } from "@/components/ui/cursor-follower";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: 'MD. Ashikur Rahman PUSPO | CSE Student & Full Stack Developer',
  description: 'Portfolio of MD. Ashikur Rahman PUSPO, a CSE Student and Full Stack Developer specializing in Next.js and Spring Boot.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://puspo.online',
    title: 'MD. Ashikur Rahman PUSPO',
    description: 'Building Digital Excellence with Next.js and Spring Boot.',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'MD. Ashikur Rahman PUSPO',
      },
    ],
  },
  metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(inter.variable, jakarta.variable, "font-sans min-h-screen antialiased bg-background text-foreground selection:bg-primary/20")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <LightModeBackground />
          <CursorFollower />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
