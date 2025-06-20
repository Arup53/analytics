"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <div className="flex justify-center items-center z-40">
        <div className=" flex justify-between items-center">
          {session ? (
            <Button onClick={() => signOut()}>SignOut</Button>
          ) : (
            <Link href={"/api/auth/signin"}>
              <Button>login</Button>
            </Link>
          )}
          <div>
            <Link href={"/dashboard"}>
              <Button>Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
