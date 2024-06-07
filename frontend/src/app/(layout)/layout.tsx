import { Inter } from "next/font/google";
import "../globals.css";
import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/sonner";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const inter = Inter({ subsets: ["latin"] });

export default async function DefaultLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Navigation />
            <Breadcrumbs />
            <Toaster />
            {children}
        </main>
    );
}
