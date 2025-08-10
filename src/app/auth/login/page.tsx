"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useActionState } from "react";
import { loginCredentials } from "../lib/actions";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchema } from "../lib/schema";

export default function Page() {
  const [state, formAction, pending] = useActionState(loginCredentials, null);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  return (
    <>
      <h2 className="text-center text-3xl scroll-m-20 font-extrabold text-balance">
        Log into your account
      </h2>
      <Form {...form}>
        <form className="flex flex-col gap-2" action={formAction}>
          <FormField
            control={form.control}
            name="email"
            disabled={pending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-muted-foreground text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            disabled={pending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-muted-foreground text-sm" />
              </FormItem>
            )}
          />
          <Separator className="my-4" />
          <Button
            type="submit"
            disabled={
              // Is form being submitted?
              pending ||
              // Do we have any formErrors? Post-validation
              Object.keys(form.formState.errors).length > 0 ||
              // Is the form even valid? I mean... It's empty in the beginning, we cannot take that
              !form.formState.isValid
            }
          >
            Log in
          </Button>
          <Button variant="secondary" type="button" asChild>
            <Link href="/auth/register">Don't have an account?</Link>
          </Button>
        </form>
      </Form>
    </>
  );
}
