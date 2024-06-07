"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import AvatarDropdown from "./AvatarDropdown";
import generateNavItems from "@/common/NavItems";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import Login from "./auth/Login";

export default function Navigation() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <h1 className="text-xl">LOGO</h1>
        </Link>
        {generateNavItems(session?.user.slug).map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`text-muted-foreground hover:text-foreground ${pathname === item.path && "text-primary"}`}
          >
            {item.name}
          </Link>
        ))}
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
            {generateNavItems(session?.user.slug).map((item, index) => (
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
      <div className="flex w-full items-center gap-4 justify-end">
        {session?.user
          ? (
            <>
              <Link href="/create-post" className={buttonVariants({ variant: "outline", className: "hover:bg-blue-100" })}>
                Create post!
              </Link>
              <AvatarDropdown user={session?.user} image={session?.user?.image} />
            </>
          )
          : <Login />
        }
      </div>
    </header>
  );
}
