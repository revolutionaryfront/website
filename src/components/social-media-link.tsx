import Link from "next/link";

export interface SocialMediaLinkProps {
  /**
   * Accessible label (for screen readers).
   */
  alt: string;
  /**
   * Link to navigate to when clicked.
   */
  href: string;
  /**
   * Source image URI.
   */
  src: string;
}

export const SocialMediaLink: React.FunctionComponent<SocialMediaLinkProps> = (
  { alt, href, src }
) => {
  return (
    <Link
      aria-label={alt}
      href={href}
      target="_blank"
      rel="nofollow noreferrer">
      <span
        aria-hidden="true"
        className="block size-[25px] bg-current"
        style={{
          maskImage: `url("${src}")`,
          maskPosition: "center",
          maskRepeat: "no-repeat",
          maskSize: "contain",
        }}
      />
    </Link>
  );
};
