import { useRef } from "react";
import PasswordInput from "../PasswordInput";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Errors } from "@/interfaces";
import { useAuth } from "../context/AuthProvider";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function LoginContent({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();

  const submit = async () => {
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      toast.error(Errors.Common.EmptyFields);
      return;
    }

    try {
      const res = await fetch(`${strapiUrl}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if (res.status !== 200) {
        return toast.error(Errors.Auth.IncorrectCredentials);
      }

      const { jwt, user } = await res.json();

      login(jwt, user);

      toast.success("Login Successful");
      closeDialog();
    } catch (e) {
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
