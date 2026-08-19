import Link from "next/link";

import { cls } from "@/lib/string";

export interface CallToActionButtonProps {
  openInNewTab?: boolean;
  path: string;
  privacy?: boolean;
  text: string;
}

export const CallToActionButton: React.FunctionComponent<CallToActionButtonProps> = (
  { openInNewTab, path, privacy, text }
) => {
  return (
    <Link
      className={cls(
        "bg-black flex font-title font-bold hover:bg-highlight h-40 hover:text-black",
        "items-center justify-center m-5 text-3xl text-body-light uppercase w-80"
      )}
      href={path}
      target={openInNewTab ? "_blank" : undefined}
      rel={privacy ? "nofollow noreferrer" : undefined}>
        {text}
    </Link>
  );
};