"use client";

import Link from "next/link";

type Props = {
  onClickHandler?: () => void;
  text: string;
  src?: string | null;
  bgColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
};

const Button = ({
  onClickHandler,
  text,
  src = null,
  bgColor = "bg-cyan-700",
  textColor = "text-white",
  width = 24,
  height = 10,
}: Props) => {
  if (src === null)
    return (
      <button
        onClick={onClickHandler}
        className={`${textColor} py-1 px-2 text-center rounded-lg customButtonBg ${bgColor} w-${width} h-${height} transition`}
      >
        {text}
      </button>
    );
  return (
    <Link href={src}>
      <button
        onClick={onClickHandler}
        className={`${textColor} p-2 text-center rounded-lg customButtonBg ${bgColor} w-${width} h-${height} transition`}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
