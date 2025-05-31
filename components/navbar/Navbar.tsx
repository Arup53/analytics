"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex justify-center items-center">
        <div className=" flex justify-between items-center">
          {session ? (
            <Button onClick={() => signOut()}>SignOut</Button>
          ) : (
            <Link href={"/api/auth/signin"}>
              <Button>login</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
