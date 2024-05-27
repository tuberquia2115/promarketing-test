"use client";

import { InputHTMLAttributes } from "react";

import { Check } from "@/icons";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = (props: Props) => (
  <label className="relative flex items-center cursor-pointer" htmlFor="checkbox">
    <input
      type="checkbox"
      id="checkbox"
      className="appearance-none relative h-5 w-5 cursor-pointer rounded-[4px] border-2 border-secondary1 transition-all checked:border-secondary1 checked:bg-secondary1 checked:before:bg-secondary1"
      {...props}
    />
    {props.checked && (
      <div className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 transition-opacity">
        <Check />
      </div>
    )}
  </label>
);
