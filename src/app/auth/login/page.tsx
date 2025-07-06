"use client";
import FormField from "@/components/auth/FormField";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createUser } from "@/lib/actions";
import Link from "next/link";
import { useActionState } from "react";

export default function Page() {
  const [state, formAction, pending] = useActionState(createUser, {
    errors: {},
  });

  return (
    <>
      <h2 className="text-center text-3xl scroll-m-20 font-extrabold text-balance">
        Log into your account
      </h2>
      <form className="flex flex-col gap-2" action={formAction}>
        <FormField name="email" type="email">
          Email
        </FormField>

        <FormField name="password" type="password" minLength={8} maxLength={50}>
          Password
        </FormField>

        <Separator className="my-2.5" />

        <Button type="submit" disabled={pending}>
          {pending ? "Logging you in..." : "Log in"}
        </Button>
        <Button variant="secondary" type="button" asChild>
          <Link href="/auth/register">Don't have an account?</Link>
        </Button>
      </form>
    </>
  );
}
