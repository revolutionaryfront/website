import Link from "next/link";

export interface SocialMediaButtonProps {
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

export const SocialMediaButton: React.FunctionComponent<SocialMediaButtonProps> = (
  { alt, href, src }
) => {
  return (
    <Link
      aria-label={alt}
      className="text-body-light transition-colors hover:text-highlight"
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
