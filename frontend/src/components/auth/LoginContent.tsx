import { useRef, useState } from "react";
import PasswordInput from "../PasswordInput";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Errors } from "@/interfaces";
import { signIn } from "next-auth/react";
import validateEmail from "@/utils/validateEmail";
import { LoaderCircle } from "lucide-react";

export default function LoginContent({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submit = async () => {
    setLoading(true);

    if (!emailRef.current?.value || !passwordRef.current?.value) {
      setLoading(false);
      return toast.error(Errors.Common.EmptyFields);
    }

    if (!(validateEmail(emailRef.current?.value))) {
      setLoading(false);
      return toast.error(Errors.Auth.EmailInvalid);
    }

    signIn("credentials", {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      redirect: false,
    }).then((res) => {
      if (res?.status !== 200) {
        setLoading(false);
        return toast.error(Errors.Auth.IncorrectCredentials);
      } else {
        toast.success("Login Successful");
        closeDialog();
      }
    }).catch(() => {
      toast.error(Errors.Common.Unexpected);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="email"
        required
        ref={emailRef}
        placeholder="Email"
        className="px-3 py-2 h-10 rounded-md bg-background"
        onEnter={() => submit()}
      />

      <PasswordInput
        ref={passwordRef}
        onEnter={() => {
          submit();
        }}
      />

      <Button className="w-full" onClick={submit} disabled={loading} >
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
