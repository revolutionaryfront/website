import { cls } from "@/lib/string";

export interface PageProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main page wrapper. 
 */
export const Page: React.FunctionComponent<PageProps> = ({ children, className }) => {
  return <main
    className={cls(
      "flex-1 max-w-6xl p-5 w-full",
      className ?? ""
    )}>
      {children}
    </main>;
};
