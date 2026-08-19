import Image from "next/image";
import Link from "next/link";
import CCLogo from "@public/images/license/cc.svg";
import CCAttributionIcon from "@public/images/license/cc_by.svg";
import CCNonCommercialIcon from "@public/images/license/cc_nc.svg";
import CCShareAlikeIcon from "@public/images/license/cc_sa.svg";

export const Footer: React.FunctionComponent = () => {
  return (
    <footer className="bg-black text-neutral-100 p-5 w-full">
      <nav className="flex flex-col font-title uppercase">
        <Link href="/">Home</Link>
        <Link href="/points-of-unity">Points of Unity</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/join">Join Us</Link>
      </nav>
      <p className="font-title mt-5">
        This work is licensed under Creative Commons&nbsp;
        <Link
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="nofollow noreferrer">
            BY-NC-SA 4.0&nbsp;
            <Image
              className="inline"
              alt="Creative Commons Logo"
              src={CCLogo.src}
              height={16}
              width={16}/>
            <Image
              className="inline"
              alt="Creative Commons Attribution Icon"
              src={CCAttributionIcon.src}
              height={16}
              width={16}/>
            <Image
              className="inline"
              alt="Creative Commons Non-Commercial Icon"
              src={CCNonCommercialIcon.src}
              height={16}
              width={16}/>
            <Image
              className="inline"
              alt="Creative Commons Share-Alike Icon"
              src={CCShareAlikeIcon.src}
              height={16}
              width={16}/>
        </Link>
      </p>
    </footer>
  );
};
