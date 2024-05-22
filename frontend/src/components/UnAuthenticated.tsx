import Login from "./auth/Login";

export default function UnAuthenticated() {
    return (
        <div className="fixed w-full flex items-center justify-center top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div className="bg-zinc-100 p-4 rounded-md shadow-md border border-zinc-200">
                <h1 className="font-semibold text-xl">Unauthenticated!</h1>
                <h2 className="">Please log in or create an account to create an blog post!</h2>
                <div className="space-x-2 mt-2">
                    <Login />
                    <Login signUp />
                </div>
            </div>
        </div>
    )
}