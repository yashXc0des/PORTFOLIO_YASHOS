export type CatState = "idle" | "walk" | "sleep" | "sit";

export const CAT_CONFIG = {
  name: "Lucy",
  src: "/sprites/pixel-cat.gif",
  displaySize: 120,
} as const;

export const ROAM_BOUNDS = { minX: 0, maxX: 12, minY: 0, maxY: 10 };
export const SLEEP_SPOT = { x: 2, y: 4 };
export const CAT_HOUSE = { x: 12, y: -52 };
