import { useRef } from "react";
import PasswordInput from "../PasswordInput";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import validateEmail from "@/utils/validateEmail";
import Errors from "@/interfaces/errors";

export default function RegisterContent({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (
      !emailRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !passwordConfirmRef.current?.value
    ) {
      toast.error(Errors.Auth.EmptyFields);
      return;
    }

    if (!validateEmail(emailRef.current?.value)) {
      toast.error(Errors.Auth.EmailInvalid);
      return;
    }

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      toast.error(Errors.Auth.PasswordsDontMatch);
      return;
    }

    if (passwordRef.current?.value && passwordRef.current.value.length < 6) {
      toast.error(Errors.Auth.PasswordLength);
      return;
    }

    fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current?.value,
        username: nameRef.current?.value,
        password: passwordRef.current?.value,
      }),
    })
      .then(() => {
        toast.success("Register successful");
        closeDialog();
      })
      .catch(() => {
        toast.error(Errors.Common.Unexpected);
      });
  };

  return (
    <div>
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

        <Input
          type="text"
          required
          ref={nameRef}
          placeholder="Username"
          className="p-2 rounded-md"
          onKeyDown={(key) => {
            if (key.code === "Enter") {
              submit();
            }
          }}
        />

        <PasswordInput ref={passwordRef} onEnter={submit} />
        <PasswordInput
          ref={passwordConfirmRef}
          onEnter={submit}
          label="Confirm Password"
        />
      </div>
      <Button className="mt-4 w-full" onClick={submit}>
        Register
      </Button>
    </div>
  );
}
