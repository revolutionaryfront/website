export interface PointsOfUnitySectionSubtitleProps {
  children: React.ReactNode;
}

export const PointsOfUnitySectionSubtitle: React.FunctionComponent<PointsOfUnitySectionSubtitleProps> = ({ children }) => {
  return (
    <h3 className="font-bold mt-3">{children}</h3>
  );
};
