import { Link, LinkProps } from "@/components/Link";
import { cls } from "@/lib/string";

export interface HeaderLinkProps extends LinkProps {
  /**
   * Whether this should be rendered as a primary link.
   */
  primary?: boolean;
}

export const HeaderLink: React.FunctionComponent<HeaderLinkProps> = (props) => {
  return (
    <Link
      className={cls(
        props.className ?? "",
        "flex font-bold hover:bg-highlight hover:text-black items-center justify-center p-5 text-body-light text-center uppercase w-50",
        props.primary ? "bg-revolutionary-red" : ""
      )}
      {...props} />
  );
};
