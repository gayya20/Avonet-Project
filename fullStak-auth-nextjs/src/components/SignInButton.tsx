"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession(); //next auth hook
  console.log({ session });

  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <p style={{color:"white"}}> 
          Welcome {session.user.name} </p>
        <Link
          href={"/api/auth/signout"}
          className="flex gap-4 ml-auto text-red-600"
        >
          Sign Out
        </Link>
      </div>
    );

  return (
    <div className="flex gap-4 ml-auto items-center">
      <Link
        href={"/api/auth/signin"}
        className="flex gap-4 ml-auto text-black p-2" // Changed to only have black text
          style={{color:"white"}} >
        Sign In
      </Link>
      <Link
        href={"/signup"}
        className="flex gap-4 ml-auto bg-black text-white p-2 rounded"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default SignInButton;
