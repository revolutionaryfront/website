"use client";

export interface SeamlessIFrameProps {
  src: string;
}


export const SeamlessIFrame: React.FunctionComponent<SeamlessIFrameProps> = ({ src }) => {
  return (
    <iframe
      className="block border-none h-full w-full"
      src={src}
      referrerPolicy="no-referrer"></iframe>
  );
};
