import Link from "next/link";
import { Roboto } from "next/font/google";
import Login from "./Login";
import Logged from "./Logged";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1>LOGO</h1>
      </Link>
      <ul>
        {!session?.user ? (
          <Login />
        ) : (
          <Logged image={session.user.image || ""} />
        )}
      </ul>
    </nav>
  );
}
