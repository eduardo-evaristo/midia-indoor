import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormDialog from "./components/FormDialog";
import { getAllPlaylists } from "@/lib/db/playlist";
import { unstable_cache } from "next/cache";

export default async function Page() {
  // const playlists = await getAllPlaylists();
  const getPlaylists = unstable_cache(
    async () => {
      return getAllPlaylists();
    },
    ["playlists"],
    { tags: ["playlists"] }
  );

  const playlists = await getPlaylists();

  return (
    <div className="flex justify-center h-full">
      <div className="w-[50%] shadow">
        <Table>
          <TableCaption className="text-end">
            <FormDialog />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da playlist</TableHead>
              <TableHead>Quantidade de mídias</TableHead>
              <TableHead>Tempo de exibição</TableHead>
              <TableHead>Opções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playlists.map((playlist, i) => (
              <TableRow key={i}>
                <TableCell>{playlist.nome}</TableCell>
                <TableCell>12</TableCell>
                <TableCell>{playlist.intervalo}</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
