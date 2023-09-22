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
  icon?: JSX.Element | null;
};

const MyButton = ({
  onClickHandler,
  text,
  src = null,
  bgColor = "bg-cyan-700",
  textColor = "text-white",
  width = 24,
  height = 10,
  icon = null,
}: Props) => {
  if (src === null)
    return (
      <button
        onClick={onClickHandler}
        className={`${textColor} flex flex-row items-center gap-2 py-1 px-2 justify-center rounded-lg customButtonBg ${bgColor} w-${width} h-${height} transition`}
      >
        {icon} {text}
      </button>
    );
  return (
    <Link href={src}>
      <button
        onClick={onClickHandler}
        className={`${textColor} flex flex-row items-center gap-2 py-1 px-2 justify-center rounded-lg customButtonBg ${bgColor} w-${width} h-${height} transition`}
      >
        {icon} {text}
      </button>
    </Link>
  );
};

export default MyButton;
