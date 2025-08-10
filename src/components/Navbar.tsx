import Image from "next/image";
import { Button } from "./ui/button";
import ClientButton from "./ClientButton";
import { Session } from "next-auth";
import { login, logout } from "@/app/auth/lib/actions";
import Link from "next/link";

type Props = {
  session: Session | null;
};

export default function Navbar({ session }: Props) {
  return (
    <nav className="bg-background h-20 flex justify-between p-4 items-center shadow">
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
        {session ? (
          <>
            <Button className="text-md" variant="ghost">
              Devices
            </Button>
            <Button className="text-md" variant="ghost">
              Playlists
            </Button>
            <ClientButton serverAction={logout} text="Log out" />
          </>
        ) : (
          <>
            <Button>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
