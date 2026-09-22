export interface PointsOfUnitySectionProps {
  children: React.ReactNode;
}

export const PointsOfUnitySection: React.FunctionComponent<PointsOfUnitySectionProps> = ({ children }) => {
  return (
    <section className="mt-8">{children}</section>
  );
};
