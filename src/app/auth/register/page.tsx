"use client";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createUser } from "@/lib/actions";
import { registerSchema, RegisterSchema } from "../lib/schema";
// import FormField from "@/components/auth/FormField";

export default function Page() {
  const [, action, pending] = useActionState(createUser, null);
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });
  console.log(form.formState.touchedFields);

  return (
    <>
      <h2 className="text-center text-3xl scroll-m-20 font-extrabold text-balance">
        Create your account
      </h2>
      <Form {...form}>
        <form className="flex flex-col gap-2" action={action}>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            disabled={pending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="password"
                    placeholder="Confirm your password"
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
            Create an account
          </Button>
          <Button variant="secondary" type="button" asChild>
            <Link href="/auth/login">Already have an account?</Link>
          </Button>
        </form>
      </Form>
    </>
  );
}

// export default function Page() {
//   const [state, formAction, pending] = useActionState(createUser, {
//     errors: {},
//   });

//   return (
//     <>
//       <h2 className="text-center text-3xl scroll-m-20 font-extrabold text-balance">
//         Create your account
//       </h2>
//       <form className="flex flex-col gap-2" action={formAction}>
//         <FormField name="email" type="email">
//           Email
//         </FormField>

//         <FormField name="password" type="password" minLength={8} maxLength={50}>
//           Password
//         </FormField>

//         <FormField
//           name="confirmPassword"
//           type="password"
//           minLength={8}
//           maxLength={50}
//         >
//           Confirm password
//         </FormField>

//         <Separator className="my-2.5" />

//         <Button type="submit" disabled={pending}>
//           {pending ? "Creating account..." : "Create an account"}
//         </Button>
//         <Button variant="secondary" type="button" asChild>
//           <Link href="/auth/login">Already have an account?</Link>
//         </Button>
//       </form>
//     </>
//   );
// }
