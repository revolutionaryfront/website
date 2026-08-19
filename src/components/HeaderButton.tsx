import Link from "next/link";

import { cls } from "@/lib/string";

export interface HeaderButtonProps {
  openInNewTab?: boolean;
  path: string;
  primary?: boolean;
  privacy?: boolean;
  text: string;
}

export const HeaderButton: React.FunctionComponent<HeaderButtonProps> = (
  { openInNewTab, path, primary, privacy, text }
) => {
  return (
    <Link
      className={cls(
        "flex font-bold hover:bg-highlight hover:text-black items-center justify-center text-body-light uppercase w-50",
        primary ? "bg-revolutionary-red" : ""
      )}
      href={path}
      target={openInNewTab ? "_blank" : undefined}
      rel={privacy ? "nofollow noreferrer" : undefined}>
        {text}
    </Link>
  );
};
