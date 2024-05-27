import { InputHTMLAttributes } from "react";
import { Checkbox } from "../checkbox/Checkbox";
import { Radio } from "../radio/Radio";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: Props) => {
  const { type, className, ...restProps } = props;

  if (type === "checkbox") {
    return <Checkbox {...restProps} />;
  }

  if (type === "radio") {
    return <Radio {...restProps} />;
  }

  return (
    <input
      className={`${props.className} text-[#909090] hide-calendar-icon w-[355px] relative px-4 py-2 border border-secondary1 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary1 focus:border-transparent`}
      {...restProps}
    />
  );
};
