"use client";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <div className="flex justify-center items-center">
        <div>
          {session ? (
            <>
              <h1>Welcome, {session.user?.name}</h1>
              <button onClick={() => signOut()}>Sign Out</button>
            </>
          ) : (
            <>
              <h1>You are not signed in</h1>
              <button onClick={() => signIn("google")}>
                Sign In with Google
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
