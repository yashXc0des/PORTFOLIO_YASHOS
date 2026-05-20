"use client";

import { CAT_CONFIG, CatState } from "./catConfig";

interface Props {
  state: CatState;
  direction: 1 | -1;
  frameIndex: number;
  size: number;
}

export default function SpriteSheetCat({ state, direction, frameIndex, size }: Props) {
  const { spritesheet } = CAT_CONFIG;
  const src =
    state === "walk"
      ? spritesheet.walk
      : state === "sleep"
        ? spritesheet.sleep
        : state === "sit"
          ? spritesheet.sit
          : spritesheet.idle;

  const frame = frameIndex % spritesheet.frameCount;
  const scale = size / spritesheet.frameWidth;

  return (
    <div
      className="overflow-hidden pixel-art"
      style={{
        width: size,
        height: size,
        transform: direction === -1 ? "scaleX(-1)" : "scaleX(1)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        draggable={false}
        className="max-w-none pixel-art"
        style={{
          width: spritesheet.frameWidth * spritesheet.frameCount * scale,
          height: spritesheet.frameWidth * scale,
          transform: `translateX(-${frame * spritesheet.frameWidth * scale}px)`,
        }}
      />
    </div>
  );
}
