import { cls } from "@/lib/string";
import { useId } from "react";

export interface FormInputProps {
  label: string;
  name: string;
  required?: boolean;
  type: "short-text" | "long-text" | "email";
}

export const FormInput: React.FunctionComponent<FormInputProps> = ({ label, name, required, type }) => {
  const inputId = useId();

  const inputClasses = "focus:outline-solid focus:outline-2 border-2 border-solid outline-offset-2 p-2 w-full";

  const inputElem = type === "long-text"
    ? <textarea
        id={inputId}
        name={name}
        required={required}
        className={cls(inputClasses, "min-h-50")} />
    : <input
        type={type === "short-text" ? "text" : type}
        id={inputId}
        name={name}
        required={required}
        className={inputClasses} />;

  return (
    <div className="mb-4 mt-4">
      <label htmlFor={inputId} className="block font-bold mb-1 text-sm">{label}</label>
      {inputElem}
    </div>
  );
};
