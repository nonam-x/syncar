import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import { Geist, Hanken_Grotesk, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Syncar — AI-First Email & Calendar",
  description:
    "The AI command layer for email and calendar. Powered by Gemini AI and Google Workspace.",
  keywords: ["email", "calendar", "AI", "productivity", "Superhuman", "Syncar"],
  icons: {
    icon: [
      {
        url: "/light-trans-logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/dark-trans-logo.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/light-trans-logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/dark-trans-logo.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`h-full ${geist.variable} ${hankenGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
        <body className="h-full antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
