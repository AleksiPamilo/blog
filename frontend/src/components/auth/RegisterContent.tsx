import { useRef, useState } from "react";
import PasswordInput from "../PasswordInput";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import validateEmail from "@/utils/validateEmail";
import { Errors } from "@/interfaces";
import createSlug from "@/utils/createSlug";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function RegisterContent({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submit = () => {
    setLoading(true);

    if (
      !emailRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !passwordConfirmRef.current?.value
    ) {
      toast.error(Errors.Auth.EmptyFields);
      setLoading(false);
      return;
    }

    if (!validateEmail(emailRef.current?.value)) {
      toast.error(Errors.Auth.EmailInvalid);
      setLoading(false);
      return;
    }

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      toast.error(Errors.Auth.PasswordsDontMatch);
      setLoading(false);
      return;
    }

    if (passwordRef.current?.value && passwordRef.current.value.length < 6) {
      toast.error(Errors.Auth.PasswordLength);
      setLoading(false);
      return;
    }

    fetch(`${strapiUrl}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current?.value,
        username: nameRef.current?.value,
        password: passwordRef.current?.value,
        slug: "@" + createSlug(nameRef.current?.value ?? "")
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          signIn("credentials", {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            redirect: false,
          });
          toast.success("Register successful");
        }

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
          className="px-3 py-2 h-10 rounded-md bg-background"
          onEnter={() => submit()}
        />

        <Input
          type="text"
          required
          ref={nameRef}
          placeholder="Username"
          className="px-3 py-2 h-10 rounded-md bg-background"
          onEnter={() => submit()}
        />

        <PasswordInput ref={passwordRef} onEnter={submit} />
        <PasswordInput
          ref={passwordConfirmRef}
          onEnter={submit}
          label="Confirm Password"
        />
      </div>

      <Button className="mt-4 w-full" onClick={submit} disabled={loading} >
        {loading ? <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
          : <p>Sign In</p>
        }
      </Button>
    </div>
  );
}
