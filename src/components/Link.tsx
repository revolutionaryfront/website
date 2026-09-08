import { default as NextLink } from "next/link";

export interface LinkProps {
  ariaLabel?: string;
  className?: string;
  /**
   * Perform an action when the user clicks the button.
   */
  onClick?: () => void;
  /**
   * Whether to open the button's link in a new tab.
   */
  openInNewTab?: boolean;
  /**
   * Path to navigate the user to when clicked.
   */
  path: string;
  /**
   * When `true`, this option suppresses referrers and adds "nofollow" to the link's rel.
   */
  privacy?: boolean;
  /**
   * Button text.
   */
  text: string;
}

export const Link: React.FunctionComponent<LinkProps> = (
  { ariaLabel, className, onClick, openInNewTab, path, privacy, text }
) => {
  return (
    <NextLink
      aria-label={ariaLabel}
      className={className}
      href={path}
      target={openInNewTab ? "_blank" : undefined}
      rel={privacy ? "nofollow noreferrer" : undefined}
      onClick={onClick}>
        {text}
    </NextLink>
  );
};