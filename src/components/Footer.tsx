import Image from "next/image";
import Link from "next/link";

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
              src="/images/license/cc.svg"
              height={16}
              width={16}/>
            <Image
              className="inline"
              alt="Creative Commons Attribution Logo"
              src="/images/license/cc_by.svg"
              height={16}
              width={16}/>
            <Image
              className="inline"
              alt="Creative Commons Non-Commercial Logo"
              src="/images/license/cc_nc.svg"
              height={16}
              width={16}/>
            <Image
              className="inline"
              alt="Creative Commons Share-Alike Logo"
              src="/images/license/cc_sa.svg"
              height={16}
              width={16}/>
        </Link>
      </p>
    </footer>
  );
};
