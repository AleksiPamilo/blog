import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginContent from "./LoginContent";
import RegisterContent from "./RegisterContent";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Login({ signUp = false }: { signUp?: boolean }) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const closeDialog = () => setIsDialogOpen(false);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>{signUp ? "Register" : "Sign In"}</Button>
            </DialogTrigger>
            <DialogContent>
                <Tabs defaultValue={signUp ? "register" : "account"} className="w-full mt-3">
                    <TabsList className="w-full">
                        <TabsTrigger className="w-full" value="signIn">Sign In</TabsTrigger>
                        <TabsTrigger className="w-full" value="register">Register</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signIn">
                        <LoginContent {...{ closeDialog }} />
                    </TabsContent>

                    <TabsContent value="register">
                        <RegisterContent {...{ closeDialog }} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}