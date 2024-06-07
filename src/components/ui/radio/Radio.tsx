import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Radio = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <label htmlFor={props.id} className="relative flex items-center justify-center">
    <input
      ref={ref}
      type="radio"
      className="appearance-none cursor-pointer peer h-5 w-5 border border-[#909090] rounded-full checked:border-secondary1 z-50"
      {...props}
    />
    <div className="h-2.5 w-2.5 rounded-full absolute transition-opacity peer-checked:opacity-100 peer-checked:bg-secondary1" />
  </label>
));
