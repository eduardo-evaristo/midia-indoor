"use client";
import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import { createUser } from "@/lib/actions";
import Link from "next/link";
import { useActionState } from "react";
import FormField from "@/components/auth/FormField";

// export default function Page() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });
//   return (
//     <main className="flex justify-center items-center h-screen ">
//       <Form {...form}>
//         <form className="flex flex-col gap-2 w-[90%] sm:w-80  shadow p-4">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="email" placeholder="Enter your email" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input type="password" placeholder="Enter your password" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="confirmPassword"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="password" placeholder="Confirm your password" />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <Separator className="my-4" />
//           <Button type="submit">Create an account</Button>
//         </form>
//       </Form>
//     </main>
//   );
// }
export default function Page() {
  const [state, formAction, pending] = useActionState(createUser, {
    errors: {},
  });

  return (
    <>
      <h2 className="text-center text-3xl scroll-m-20 font-extrabold text-balance">
        Create your account
      </h2>
      <form className="flex flex-col gap-2" action={formAction}>
        <FormField name="email" type="email">
          Email
        </FormField>

        <FormField name="password" type="password" minLength={8} maxLength={50}>
          Password
        </FormField>

        <FormField
          name="confirmPassword"
          type="password"
          minLength={8}
          maxLength={50}
        >
          Confirm password
        </FormField>

        <Separator className="my-2.5" />

        <Button type="submit" disabled={pending}>
          {pending ? "Creating account..." : "Create an account"}
        </Button>
        <Button variant="secondary" type="button" asChild>
          <Link href="/auth/login">Already have an account?</Link>
        </Button>
      </form>
    </>
  );
}
