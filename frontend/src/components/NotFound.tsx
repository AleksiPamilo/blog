import Link from "next/link";

export default function NotFound() {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-100 rounded-md shadow-md border border-zinc-200 p-4 flex flex-col gap-2">
            <h1 className="font-semibold">404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link href="/" className="py-2 px-3 bg-zinc-200 rounded-md text-center hover:bg-zinc-300">
                Go back to home page
            </Link>
        </div>
    )
}