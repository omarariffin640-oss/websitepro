import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import AnnouncementBar from "@/components/AnnouncementBar";
import Topbar from "@/components/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noor Funding - Trade Up To $200,000 Funded Capital",
  description: "Trade. Prove. Get Funded.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <AnnouncementBar />
          <Topbar />
          <main className="pt-[76px]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}