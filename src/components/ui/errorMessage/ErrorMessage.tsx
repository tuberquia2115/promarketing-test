import React from "react";

interface Props {
  className?: string | undefined;
  message?: string;
}

export const ErrorMessage = ({ message, className }: Props) => {
  if (!message) return null;
  return <p className={`${className} text-red-400 text-left pt-1`}>{message}</p>;
};
