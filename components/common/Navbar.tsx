import Link from "next/link";
import React from "react";
import { Snowflake } from "lucide-react";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

function Navbar() {
  const NavLink =
    "transition-colors text-sm duration-200 text-gray-600 hover:text-rose-600";

  return (
    <nav className="container flex items-center justify-between py-4 px-4 lg:px-8 mx-auto">
      <div className="flex-1 flex justify-start items-center">
        <Link
          href="/"
          className="flex text-xl lg:text-2xl font-bold items-center gap-2 transition-colors duration-200"
        >
          <Snowflake className="w-5 h-5 lg:w-8 lg:h-8 transition-transform duration-200 ease-in-out hover:rotate-45" />
          <p>SumAI</p>
        </Link>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <SignedIn>
          <Link href="/dashboard" className={NavLink}>
            View Your Summaries
          </Link>
        </SignedIn>
        <SignedOut>
          <Link href="/pricing" className={NavLink}>
            Pricing
          </Link>
        </SignedOut>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        <SignedIn>
          <Link href="/upload" className={NavLink}>
            Upload PDF
          </Link>
          <Link href="/" className={NavLink}>
            Pro
          </Link>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in" className={NavLink}>
            Sign In
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navbar;
