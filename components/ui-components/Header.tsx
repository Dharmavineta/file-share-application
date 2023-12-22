import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <header className="flex items-center h-16 px-10 justify-between border-b">
      <Link href={"/"} className="flex items-center space-x-1 ">
        <Image src={"/logo.svg"} alt="logo" height={20} width={20} />
        <h1 className="font-semibold">Samudra</h1>
      </Link>
      <div className="flex items-center gap-x-3">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
