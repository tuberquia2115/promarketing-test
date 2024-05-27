import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  className?: string;
}

export const Title = ({ title, className }: Props) => {
  return (
    <div className={`${className}`}>
      <h1 className={`${titleFont.className} text-xl leading-6`}>{title}</h1>
    </div>
  );
};
