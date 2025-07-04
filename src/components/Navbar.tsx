import Image from "next/image";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="bg-background h-20 flex justify-between p-4 items-center">
      <div>
        <Image
          src={"vercel.svg"}
          className="invert"
          width={30}
          height={20}
          alt="Logo"
        />
      </div>
      {/* Not all of these buttons will be present */}
      <div className="flex gap-2">
        <Button className="text-md" variant="ghost">
          Devices
        </Button>
        <Button className="text-md" variant="ghost">
          Playlists
        </Button>
        <Button className="text-md">Sign up</Button>
      </div>
    </nav>
  );
}
