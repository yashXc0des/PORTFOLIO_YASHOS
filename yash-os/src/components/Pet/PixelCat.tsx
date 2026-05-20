"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CatRenderer from "./CatRenderer";
import { CAT_CONFIG, CatState, ROAM_BOUNDS, SLEEP_SPOT } from "./catConfig";

function pickNextState(current: CatState): CatState {
  const roll = Math.random();
  if (current === "sleep") return roll > 0.6 ? "walk" : "sleep";
  if (current === "sit") return roll > 0.4 ? "walk" : "idle";
  if (roll < 0.15) return "sleep";
  if (roll < 0.3) return "sit";
  if (roll < 0.65) return "walk";
  return "idle";
}

function randomRoamTarget(currentX: number) {
  const x = ROAM_BOUNDS.minX + Math.random() * (ROAM_BOUNDS.maxX - ROAM_BOUNDS.minX);
  const y = ROAM_BOUNDS.minY + Math.random() * (ROAM_BOUNDS.maxY - ROAM_BOUNDS.minY);
  return { x, y, direction: (x > currentX ? 1 : -1) as 1 | -1 };
}

export default function PixelCat() {
  const [state, setState] = useState<CatState>("sit");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const stateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const size = CAT_CONFIG.displaySize;

  const transitionTo = useCallback((next: CatState, currentX: number) => {
    setState(next);

    if (next === "sleep") {
      setPosition(SLEEP_SPOT);
    } else if (next === "walk") {
      const target = randomRoamTarget(currentX);
      setDirection(target.direction);
      setPosition({ x: target.x, y: target.y });
    }
  }, []);

  useEffect(() => {
    if (stateTimerRef.current) clearTimeout(stateTimerRef.current);

    const duration =
      state === "walk" ? 3200 : state === "sleep" ? 8000 : state === "sit" ? 4000 : 2800;

    stateTimerRef.current = setTimeout(() => {
      transitionTo(pickNextState(state), position.x);
    }, duration);

    return () => {
      if (stateTimerRef.current) clearTimeout(stateTimerRef.current);
    };
  }, [state, position.x, transitionTo]);

  return (
    <motion.div
      className="absolute z-40 pointer-events-none"
      style={{ width: size, height: size, left: position.x, bottom: position.y }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ left: position.x, bottom: position.y, opacity: 1, scale: 1 }}
      transition={{
        left: { duration: state === "walk" ? 3.2 : 0.4, ease: "easeInOut" },
        bottom: { duration: state === "walk" ? 3.2 : 0.4, ease: "easeInOut" },
        opacity: { duration: 0.5, delay: 0.8 },
        scale: { duration: 0.5, delay: 0.8 },
      }}
    >
      <CatRenderer direction={direction} size={size} />
    </motion.div>
  );
}
