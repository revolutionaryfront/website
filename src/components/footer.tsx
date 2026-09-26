import Image from "next/image";
import Link from "next/link";

import { FooterLink } from "@/components/footer-link";
import { SocialMediaLink } from "@/components/social-media-link";

import CCLogo from "@public/images/license/cc.svg";
import CCAttributionIcon from "@public/images/license/cc_by.svg";
import CCNonCommercialIcon from "@public/images/license/cc_nc.svg";
import CCShareAlikeIcon from "@public/images/license/cc_sa.svg";
import InstagramLogoWhite from "@public/images/instagram-logo-white.svg"

export const Footer: React.FunctionComponent = () => {
  return (
    <footer className="bg-black flex font-title text-body-light mt-auto p-5 w-full">
      <div>
        <nav className="flex">
          <FooterLink path="/" text="Home" />
          <FooterLink path="/contact" text="Contact" />
          <FooterLink path="/join" text="Join" />
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
        <SocialMediaLink
          alt="Instagram"
          href="https://instagram.com/RevolutionaryFrontDFW"
          src={InstagramLogoWhite.src} />
      </div>
    </footer>
  );
};
