export interface FormButtonProps {
  children?: React.ReactNode;
}

export const FormButton: React.FunctionComponent<FormButtonProps> = ({ children }) => {
  return (
    <button
      className="bg-black cursor-pointer font-bold hover:bg-highlight hover:text-black p-5 text-body-light text-center uppercase w-50"
      type="submit">
      {children}
    </button>
  );
};
