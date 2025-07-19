import { HTMLInputTypeAttribute, PropsWithChildren } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { _maxLength } from "zod/v4/core";

type Props = {
  name: string;
  type: HTMLInputTypeAttribute;
  maxLength?: number;
  minLength?: number;
};

export default function FormField({
  name,
  type,
  children,
  maxLength,
  minLength,
}: PropsWithChildren<Props>) {
  return (
    <>
      <Label htmlFor={name}>{children}</Label>
      <Input
        type={type}
        name={name}
        required
        {...(maxLength ? { maxLength } : {})}
        {...(minLength ? { minLength } : {})}
      />
    </>
  );
}
