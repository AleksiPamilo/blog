import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/components/context/AuthProvider";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog with NextJS and Strapi CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TooltipProvider>
            <Navigation />
            <Breadcrumbs />
            <Toaster />
            {children}
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html >
  );
}
