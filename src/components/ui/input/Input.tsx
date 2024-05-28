"use client";

import React, { InputHTMLAttributes } from "react";

import { Checkbox } from "../checkbox/Checkbox";
import { Radio } from "../radio/Radio";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { onChange, onBlur, name } = props;

  if (props.type === "checkbox") {
    return <Checkbox {...props} />;
  }

  if (props.type === "radio") {
    return <Radio {...props} />;
  }

  return (
    <input
      {...props}
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      className={`${props.className} text-[#909090] hide-calendar-icon w-[355px] relative px-4 py-2 border border-secondary1 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary1 focus:border-transparent`}
    />
  );
});

export { Input };
