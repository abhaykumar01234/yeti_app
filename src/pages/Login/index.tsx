import { useId, useRef, useEffect } from "react";
import { FormField } from "../../components/FormField";
import { YetiLogo, type YetiLogoRef } from "./YetiLogo";

export const Login = () => {
  const id = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<YetiLogoRef>(null);

  useEffect(() => {
    if (!logoRef.current) return;
    logoRef.current.initFace();
    logoRef.current.stopBlinking();
    setTimeout(() => {
      if (logoRef.current) logoRef.current.startBlinking(5);
    }, 500);
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
        onFocus={() => logoRef.current?.onEmailFocus()}
        onBlur={() => logoRef.current?.resetFace()}
        onInput={() => logoRef.current?.onEmailInput()}
      />
      <FormField
        id={id + "password"}
        label="Password"
        type="password"
        ref={passwordRef}
        required
        onFocus={() => logoRef.current?.coverEyes()}
        onBlur={() => {
          // if (document.activeElement !== document.querySelector("#togglePass"))
          logoRef.current?.uncoverEyes();
        }}
        onTogglePasswordBlur={() => {
          // setTimeout(() => {
          //   if (document.activeElement !== passwordRef.current)
          //     logoRef.current?.uncoverEyes();
          // }, 500);
        }}
        onShowPasswordToggle={(showing) => {
          logoRef.current?.coverEyes();
          if (showing) logoRef.current?.spreadFingers();
          else logoRef.current?.closeFingers();
        }}
      />
      <button type="submit">Log In</button>
    </form>
  );
};
