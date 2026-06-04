import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manush Patel | Full Stack Developer & AI Engineer",
  description: "Portfolio of Manush Patel - Building AI Systems, Full Stack Products, and Ideas That Scale.",
};

import Navbar from "@/components/layout/navbar";
import CommandPalette from "@/components/features/CommandPalette";
import ManushGPT from "@/components/features/ManushGPT";
import CustomCursor from "@/components/ui/custom-cursor";
import ParticleBackground from "@/components/ui/particle-background";
import PageTransition from "@/components/layout/page-transition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col font-sans bg-background text-foreground relative overflow-x-hidden"
        suppressHydrationWarning
      >
        {/* Global cursor & particles */}
        <CustomCursor />
        <ParticleBackground />

        {/* Content */}
        <Navbar />
        <main className="flex-grow flex flex-col relative z-10">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <CommandPalette />
        <ManushGPT />
      </body>
    </html>
  );
}
