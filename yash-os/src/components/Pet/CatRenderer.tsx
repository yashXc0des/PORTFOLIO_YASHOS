"use client";

import { CAT_CONFIG } from "./catConfig";

interface Props {
  direction: 1 | -1;
  size?: number;
}

export default function CatRenderer({ direction, size = CAT_CONFIG.displaySize }: Props) {
  return (
    <div style={{ transform: direction === -1 ? "scaleX(-1)" : "scaleX(1)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CAT_CONFIG.src}
        alt=""
        draggable={false}
        className="pixel-art max-w-none"
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    </div>
  );
}
