import { Size } from "@/types/common";
import React, { HTMLAttributes } from "react";

interface ChipProps {
  color?: string;
  content: string;
  onClick?: () => void;
  size?: Size;
}

export default function Chip({
  content,
  color = "blue",

  ...rest
}: ChipProps): JSX.Element {
  const bgColor = `bg-${color}-500`;
  const hoverBgColor = `hover:bg-${color}-700`;

  return (
    <div
      className={`bg-blue-200 rounded-full text-center font-bold cursor-pointer`}
    >
      <p className="text-sky-400">{content}</p>
    </div>
  );
}
