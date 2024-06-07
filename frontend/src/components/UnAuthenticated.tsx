import Link from "next/link";
import Login from "./auth/Login";

export default function UnAuthenticated() {
    return (
        <div className="fixed w-full flex items-center justify-center top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div className="bg-zinc-100 p-4 flex flex-col rounded-md shadow-md border border-zinc-200">
                <h1 className="font-semibold text-xl">Unauthenticated!</h1>
                <h2>Please log in or create an account to continue!</h2>
                <div className="space-x-2 mt-2">
                    <Login />
                    <Login signUp />
                </div>
                <Link href="/" className="py-2 px-3 mt-2 rounded-md text-center text-white bg-primary hover:bg-primary/90 ">Go home!</Link>
            </div>
        </div>
    )
}