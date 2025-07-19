"use client";

import { startTransition, useActionState } from "react";
import { Button } from "./ui/button";

type Props = {
  serverAction: () => void;
  text: string;
};

export default function ClientButton({ serverAction, text }: Props) {
  const [_state, action, pending] = useActionState(serverAction, null);
  return (
    <Button
      className="text-md"
      onClick={() => startTransition(action)}
      disabled={pending}
    >
      {text}
    </Button>
  );
}
