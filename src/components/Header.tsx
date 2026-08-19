import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeaderButton } from "@/components/HeaderButton";

export const Header: React.FunctionComponent = () => {
  return (
    <header
      className={"h-30 flex w-full items-center bg-black text-neutral-100"}
    >
      <Link href="/" className="flex items-center p-5">
        <Image
          src="/images/rf-logo-bg-black.png"
          alt="Revolutionary Front circular logo"
          loading="eager"
          className="mr-5"
          height={100}
          width={100}
        />
        <h1 className="font-title text-5xl">Revolutionary Front</h1>
      </Link>
      <nav className="flex flex-1 h-full justify-end">
        <HeaderButton text="Points of Unity" path="/points-of-unity"/>
        <HeaderButton text="Contact" path="/contact"/>
        <HeaderButton text="Donate" path="https://donate.revolutionaryfront.org" privacy openInNewTab />
        <HeaderButton text="Join" path="/join" callToAction />
      </nav>
    </header>
  );
};
