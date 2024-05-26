import { titleFont } from "@/config/fonts";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = (props: Props) => {
  const { label, className, ...restProps } = props;
  return (
    <button
      className={`${className} ${titleFont.className} font-bold rounded-xl py-[14px] text-white`}
      {...restProps}
    >
      {label}
    </button>
  );
};
