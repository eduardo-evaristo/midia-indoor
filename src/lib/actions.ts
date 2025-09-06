"use server";
import { insertPlaylist } from "./db/playlist";

export async function createPlaylist(state, formData: FormData) {
  const playlistName = formData.get("playlistName");
  const intervaloString = formData.get("intervalo");
  // Should likely validate using zod

  if (!intervaloString) return;

  const intervalo = parseInt(intervaloString as string, 10);

  const playlistObject = { nome: playlistName as string, intervalo };

  const playlist = await insertPlaylist(playlistObject);
}
