import Link from "next/link";
import { HomeIcon, BarChart2Icon } from "lucide-react"; // Icons
import React from "react";
import SignInButton from "./SignInButton";

const AppBar = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-black text-white shadow-md" >
      {/* Company Name */}
      <div className="flex items-center gap-5">
        <span className="text-xl font-bold"><span style={{ color: "#28a745" }}>Ex</span>
        por</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-7" style={{marginLeft:"50px"}}>
        <Link className="flex items-center gap-1 hover:text-gray-400" href={"/"}>
          <HomeIcon className="h-5 w-5" />
          Home
        </Link>
        <Link
          className="flex items-center gap-1 hover:text-gray-400"
          href={"/dashboard"}
        >
          <BarChart2Icon className="h-5 w-5" />
          Dashboard
        </Link>
      </nav>

      {/* Sign In Button */}
      <SignInButton />
    </header>
  );
};

export default AppBar;
