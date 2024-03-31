import { useRef } from "react";
import PasswordInput from "../PasswordInput";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Errors from "@/interfaces/errors";

export default function LoginContent({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submit = async () => {
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      toast.error(Errors.Common.EmptyFields);
      return;
    }

    try {
      const res = await signIn("credentials", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        redirect: false,
      });

      if (res?.error) {
        toast.error(Errors.Auth.IncorrectCredentials);
        return;
      }

      toast.success("Login Successful");
      closeDialog();
    } catch {
      toast.error(Errors.Common.Unexpected);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="email"
        required
        ref={emailRef}
        placeholder="Email"
        className="p-2 rounded-md"
        onKeyDown={(key) => {
          if (key.code === "Enter") {
            submit();
          }
        }}
      />

      <PasswordInput
        ref={passwordRef}
        onEnter={() => {
          submit();
        }}
      />

      <Button className="w-full" onClick={submit}>
        Sign In
      </Button>
    </div>
  );
}
