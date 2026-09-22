import { cls } from "@/lib/string";

export interface PointsOfUnitySectionHeaderProps {
  indent?: boolean;
  number: number;
  text: string;
}

export const PointsOfUnitySectionHeader: React.FunctionComponent<PointsOfUnitySectionHeaderProps> = ({ indent, number, text }) => {
  return (
    <h2 className={cls(
        "bg-black flex flex-row font-title items-center text-2xl text-body-light mb-3 mt-3 max-w-md p-3",
        indent ? "ml-8" : ""
      )}>
      <span className="mr-3 text-4xl text-revolutionary-red">{number}.</span>
      {text}
    </h2>
  );
};
