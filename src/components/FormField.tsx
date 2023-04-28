import type { ReactNode, HTMLInputTypeAttribute, ForwardedRef } from "react";
import { forwardRef, useState } from "react";
import { FormFieldInline } from "./FormFieldInline";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: ReactNode;
  type?: HTMLInputTypeAttribute;
  onTogglePasswordFocus?: () => void;
  onTogglePasswordBlur?: () => void;
  onShowPasswordToggle?: (showing: boolean) => void;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      label,
      type = "text",
      onShowPasswordToggle,
      onTogglePasswordFocus,
      onTogglePasswordBlur,
      ...restProps
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [inputType, setInputType] = useState<string>(type);
    return (
      <div className="field stack">
        <div className="inline between">
          <label htmlFor={id}>{label}</label>
          {type === "password" && (
            <FormFieldInline
              id="togglePass"
              name="togglePass"
              label={inputType === "password" ? "Show" : "Hide"}
              type="checkbox"
              checked={inputType === "password"}
              onChange={() =>
                setInputType((t) => {
                  if (typeof onShowPasswordToggle === "function")
                    onShowPasswordToggle(t === "password");
                  return t === "text" ? "password" : "text";
                })
              }
              onFocus={onTogglePasswordFocus}
              onBlur={onTogglePasswordBlur}
            />
          )}
        </div>
        <input type={inputType} id={id} ref={ref} {...restProps} />
        {/* {helper ? <p className="helper">{helper}</p> : <></>} */}
      </div>
    );
  }
);
