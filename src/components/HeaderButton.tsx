import { cls } from "@/utils/string";
import Link from "next/link";
import React from "react";

export interface HeaderButtonProps {
  callToAction?: boolean;
  openInNewTab?: boolean;
  path: string;
  privacy?: boolean;
  text: string;
}

export const HeaderButton: React.FunctionComponent<HeaderButtonProps> = (
  { callToAction, openInNewTab, path, privacy, text }
) => {
  return (
    <Link
      className={cls(
        "flex font-bold hover:bg-slate-300 hover:text-black items-center justify-center uppercase w-50",
        callToAction ? "bg-revolutionary-red" : ""
      )}
      href={path}
      target={openInNewTab ? "_blank" : undefined}
      rel={privacy ? "nofollow noreferrer" : undefined}>
        {text}
    </Link>
  );
};
