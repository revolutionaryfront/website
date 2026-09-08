import { Link, LinkProps } from "@/components/Link";
import { cls } from "@/lib/string";

export const CallToActionLink: React.FunctionComponent<LinkProps> = (props) => {
  return (
    <Link
      className={cls(
        props.className ?? "",
        "bg-black flex font-title font-bold hover:bg-highlight h-40 hover:text-black",
        "items-center justify-center m-5 text-3xl text-body-light text-center uppercase w-80"
      )}
      {...props} />
  );
};