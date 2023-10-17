import { Size } from "@/types/common";

import React, { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  content: string;
  size?: Size;
}

export default function Chip({
  content,
  color = "blue",
  onClick,
  ...rest
}: ChipProps): JSX.Element {
  const bgColor = `bg-${color}-500`;
  const hoverBgColor = `hover:bg-${color}-700`;

  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center w-fit h-5 px-3 bg-blue-200 text-sky-400 rounded-full text-center font-bold cursor-pointer`}
    >
      {content}
    </div>
  );
}
