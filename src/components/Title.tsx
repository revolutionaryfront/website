export interface TitleProps {
  children: React.ReactNode;
}

export const Title: React.FunctionComponent<TitleProps> = ({ children }) => {
  return (
    <h1 className="font-bold font-title mt-5 text-5xl">{children}</h1>
  );
};
