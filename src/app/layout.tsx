import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Playfair_Display,
} from "next/font/google";

import { Toaster } from "sonner";

import "./globals.css";
import { cn } from "@/lib/utils";

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "ContractDiff — AI Contract Comparison",
    template: "%s | ContractDiff",
  },
  description:
    "Upload two contract versions and instantly identify additions, deletions, and modifications with AI-powered comparison.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        sans.variable,
        heading.variable
      )}
    >
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: "var(--font-sans)",
            },
          }}
        />
      </body>
    </html>
  );
}