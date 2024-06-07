import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

export default function EmailConfirmation() {
    const { data: session } = useSession();
    if (!session?.user) return null;

    const emailConfirmed = session?.user.emailConfirmed;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Confirmation</CardTitle>
                <CardDescription>
                    Confirm your email address to enable posting blogs, commenting, following others, and more. Click the button below to send a confirmation message.
                </CardDescription>
            </CardHeader>
            <CardFooter className="border-t px-6 py-4 flex items-center justify-between">
                <Button onClick={() => alert("TODO")} disabled={emailConfirmed}>Send confirmation message</Button>
                {emailConfirmed && <span className="text-green-500">Email already confirmed!</span>}
            </CardFooter>
        </Card>
    )
}