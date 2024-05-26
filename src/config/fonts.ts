import { Roboto_Condensed, Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  style: "normal",
  weight: ["400"],
  preload: true,
});

export const titleFont = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});
