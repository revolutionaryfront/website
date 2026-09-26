import { X } from "lucide-react";
import { cls } from "@/lib/string";

export type AlertType = "success" | "error";

export interface AlertProps {
  children?: React.ReactNode;
  onClose: () => void;
  show?: boolean;
  type: AlertType;
}

const TYPE_COLORS: { [k in AlertType]: string } = {
  success: "bg-green-600/50",
  error: "bg-red-600/50"
};

export const Alert: React.FunctionComponent<AlertProps> = ({ children, onClose, show, type }) => {
  return (
    <div className={cls(
      `border-2 ${TYPE_COLORS[type]} flex flex-row p-2 mt-5 mb-5`,
      !show ? "hidden" : "",
    )}>
      <div className="flex-1">{children}</div>
      <X
        aria-label="Close message"
        className="cursor-pointer"
        onClick={onClose}
        tabIndex={0} />
    </div>
  );
};
