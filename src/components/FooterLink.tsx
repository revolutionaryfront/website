import { Link, LinkProps } from "@/components/Link";
import { cls } from "@/lib/string";

export const FooterLink: React.FunctionComponent<LinkProps> = (props) => {
  return (
    <Link
      className={cls(
        props.className ?? "",
        "mr-3"
      )}
      {...props} />
  );
}
