"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";

import { HeaderLink } from "@/components/header-link";

import Logo from "@public/images/rf-logo-bg-black.png";
import { cls } from "@/lib/string";

export const Header: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttons = [
    <HeaderLink
      key="about"
      text="About"
      path="/about"
      onClick={() => setIsOpen(false)}/>,
    <HeaderLink
      key="pointsOfUnity"
      text="Points of Unity"
      path="/points-of-unity"
      onClick={() => setIsOpen(false)}/>,
    <HeaderLink
      key="contact"
      text="Contact"
      path="/contact"
      onClick={() => setIsOpen(false)}/>,
    <HeaderLink
      key="join"
      text="Join"
      path="/join"
      primary
      onClick={() => setIsOpen(false)}/>,
  ];

  return (
    <header
      className="bg-black flex h-30 justify-between text-body-light w-full"
    >
      <Link href="/" className="flex items-center p-5">
        <Image
          src={Logo.src}
          alt="Revolutionary Front circular logo"
          loading="eager"
          className="mr-5"
          height={100}
          width={100}
        />
        <h1 className="font-title text-4xl xl:text-5xl">Revolutionary Front</h1>
      </Link>

      {/* Desktop nav */}
      <nav className={cls(
        "hidden h-full justify-end xl:flex"
      )}>
        {buttons}
      </nav>

      {/* Mobile nav toggle */}
      <button
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        type="button"
        className="cursor-pointer flex flex-col flex-1 hover:bg-highlight hover:text-black h-full items-center justify-center xl:hidden pl-8 pr-8 max-w-8 z-99"
        onClick={() => setIsOpen(!isOpen)}>
        <MenuIcon />
      </button>

      {/* Mobile nav main content cover */}
      <div
        aria-hidden="true"
        className={cls(
          isOpen ? "fixed" : "hidden",
          "top-0 right-0 bg-black opacity-25 w-screen h-screen")}
        onClick={() => setIsOpen(false)}></div>

      {/* Mobile nav menu */}
      <nav
        id="mobile-menu"
        className={cls(
          isOpen ? "fixed" : "hidden",
          "flex flex-col bg-black h-screen top-0 right-0 justify-items-stretch xl:hidden z-100"
        )}>
          {buttons}
      </nav>
    </header>
  );
};
