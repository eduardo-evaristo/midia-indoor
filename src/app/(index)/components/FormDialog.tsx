"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPlaylist } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const playlistSchema = z
  .object({
    playlistName: z.string().min(2).max(50),
    intervalo: z.string().min(1),
  })
  .refine((data) => !isNaN(parseInt(data.intervalo, 10)), {
    message: "The number must be a valid integer",
  });

type PlaylistSchema = z.infer<typeof playlistSchema>;

export default function FormDialog() {
  const [, action, pending] = useActionState(createPlaylist, null);
  const form = useForm<PlaylistSchema>({
    resolver: zodResolver(playlistSchema),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new playlist</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Create new playlist</DialogTitle>
          <Form {...form}>
            <form action={action}>
              <FormField
                control={form.control}
                name="playlistName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Playlist</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intervalo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intervalo</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
