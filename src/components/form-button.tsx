export interface FormButtonProps {
  text: string;
}

export const FormButton: React.FunctionComponent<FormButtonProps> = ({ text }) => {
  return (
    <button
      className="bg-black cursor-pointer font-bold hover:bg-highlight hover:text-black p-5 text-body-light text-center uppercase"
      type="submit">
      {text}
    </button>
  );
};
