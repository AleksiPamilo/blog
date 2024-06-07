"use client";

import "../globals.css";
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AvatarDropdown from "@/components/AvatarDropdown";
import UnAuthenticated from "@/components/UnAuthenticated";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import navItems from "@/common/SettingNavItems";

export default function SettingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: session } = useSession();
    const pathname = usePathname();

    if (!session?.user) {
        return <UnAuthenticated />
    }

    return (
        <main>
            <div className="flex min-h-screen w-full flex-col">
                <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                    <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold md:text-base"
                        >
                            <h1 className="text-xl">LOGO</h1>
                        </Link>
                        <Link
                            href="/"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Home
                        </Link>

                        <Link
                            href="/settings"
                            className="text-foreground transition-colors hover:text-foreground"
                        >
                            Settings
                        </Link>

                        <Link
                            href={`/${session.user.slug}/drafts`}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            My Drafts
                        </Link>
                    </nav>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <nav className="grid gap-6 text-lg font-medium">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.path}
                                        className={`text-muted-foreground hover:text-foreground ${pathname === item.path && "text-primary"}`}
                                    >
                                        {item.name}
                                    </Link>

                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="flex w-full items-center justify-end">
                        <AvatarDropdown user={session?.user} image={session?.user?.image} />
                    </div>
                </header>
                <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold">Settings</h1>
                    </div>
                    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav
                            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                        >
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.path}
                                    className={`text-muted-foreground hover:text-foreground ${pathname === item.path && "text-primary"}`}
                                >
                                    {item.name}
                                </Link>

                            ))}
                        </nav>
                        <div className="grid gap-6">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </main >
    );
}
