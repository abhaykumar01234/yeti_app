import type { ReactNode, ForwardedRef } from "react";
import { forwardRef } from "react";

interface FormFieldInlineProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: ReactNode;
  type: "checkbox" | "radio";
}

export const FormFieldInline = forwardRef<
  HTMLInputElement,
  FormFieldInlineProps
>(({ id, label, type, ...restProps }, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className="field inline" style={{ minWidth: 60 }}>
      <input type={type} id={id} ref={ref} {...restProps} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
});
