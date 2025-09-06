import { prisma } from "@/../prisma";
import { revalidateTag } from "next/cache";

export async function insertPlaylist(playlistData: {
  nome: string;
  intervalo: number;
}) {
  // Criando playlist no banco de dados
  const playlist = await prisma.playlist.create({ data: playlistData });
  revalidateTag("playlists");
  // Retornando-a
  return playlist;
}

export async function getAllPlaylists() {
  const playlists = await prisma.playlist.findMany();
  console.log(playlists);
  return playlists;
}
