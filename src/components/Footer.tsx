import Image from "next/image";
import Link from "next/link";

import { FooterLink } from "@/components/FooterLink";
import { SocialMediaButton } from "@/components/SocialMediaButton";

import CCLogo from "@public/images/license/cc.svg";
import CCAttributionIcon from "@public/images/license/cc_by.svg";
import CCNonCommercialIcon from "@public/images/license/cc_nc.svg";
import CCShareAlikeIcon from "@public/images/license/cc_sa.svg";
import InstagramLogoWhite from "@public/images/instagram-logo-white.svg"

export const Footer: React.FunctionComponent = () => {
  return (
    <footer className="bg-black flex font-title text-body-light p-5 w-full">
      <div>
        <nav className="flex">
          <FooterLink href="/" text="Home" />
          <FooterLink href="/contact" text="Contact" />
          <FooterLink href="https://donate.revolutionaryfront.org" text="Donate" openInNewTab privacy />
          <FooterLink href="/join" text="Join" />
        </nav>
        <p className="mt-5">
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
      </div>
      <div className="flex flex-1 justify-end">
        <SocialMediaButton
          alt="Instagram"
          href="https://instagram.com/RevolutionaryFrontDFW"
          src={InstagramLogoWhite.src} />
      </div>
    </footer>
  );
};
