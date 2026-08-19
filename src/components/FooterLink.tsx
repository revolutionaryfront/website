import { omit } from "@/lib/object";
import Link, { LinkProps } from "next/link";

export interface FooterLinkProps extends LinkProps {
  openInNewTab?: boolean;
  privacy?: boolean;
  text: string;
}

export const FooterLink: React.FunctionComponent<FooterLinkProps> = (props) => {
  const linkProps = omit(props, ["privacy", "openInNewTab"]);
  return (
    <Link
      className="mr-3"
      target={props.openInNewTab ? "_blank" : undefined}
      rel={props.privacy ? "nofollow noreferrer" : undefined}
      {...linkProps}>{props.text}</Link>
  );
}
