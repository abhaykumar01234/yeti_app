import { useId, useRef, useEffect } from "react";
import { FormField } from "../../components/FormField";
import { YetiLogo, type YetiLogoRef } from "./YetiLogo";
import { FormFieldInline } from "../../components/FormFieldInline";

export const Login = () => {
  const id = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<YetiLogoRef>(null);

  useEffect(() => {
    if (!logoRef.current) return;
    logoRef.current.initFace();
    logoRef.current.stopBlinking();
    setTimeout(() => {
      if (logoRef.current) logoRef.current.startBlinking(5);
    }, 500);

    const yetiLogoRef = logoRef.current;
    return () => {
      yetiLogoRef.stopBlinking();
    };
  }, []);

  return (
    <form className="loginForm stack g2">
      <YetiLogo emailRef={emailRef} ref={logoRef} />
      <FormField
        id={id + "email"}
        label="Email"
        type="email"
        name="email"
        required
        placeholder="email@domain.com"
        autoComplete="off"
        ref={emailRef}
        onFocus={() => {
          if (logoRef.current?.areEyesCovered) logoRef.current.uncoverEyes();
          logoRef.current?.onEmailFocus();
        }}
        onBlur={() => logoRef.current?.resetFace()}
        onInput={() => logoRef.current?.onEmailInput()}
      />

      <FormField
        id={id + "password"}
        label="Password"
        type="password"
        required
        onFocus={() => logoRef.current?.coverEyes()}
        onBlur={() => logoRef.current?.uncoverEyes()}
        onTogglePasswordFocus={() => logoRef.current?.coverEyes()}
        onTogglePasswordBlur={() => logoRef.current?.uncoverEyes()}
        onShowPasswordToggle={(showing) => {
          if (showing) logoRef.current?.spreadFingers();
          else logoRef.current?.closeFingers();
        }}
      />

      <FormFieldInline
        id={id + "remember"}
        label="Remember Me"
        type="checkbox"
      />

      <button type="submit">Log In</button>
    </form>
  );
};
