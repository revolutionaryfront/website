import { Link, LinkProps } from "@/components/link";
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
