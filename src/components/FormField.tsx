import type { ReactNode, HTMLInputTypeAttribute, ForwardedRef } from "react";
import { forwardRef, useState } from "react";

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
            <div className="field inline" style={{ minWidth: 60 }}>
              <input
                type="checkbox"
                id={id + "Toggle"}
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
                tabIndex={-1}
              />
              <label>{inputType === "password" ? "Show" : "Hide"}</label>
            </div>
          )}
        </div>
        <input type={inputType} id={id} ref={ref} {...restProps} />
      </div>
    );
  }
);
