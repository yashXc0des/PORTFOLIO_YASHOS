"use client";

import { useCallback, useEffect, useState } from "react";
import { BOOT_LOGS } from "@/data/bootLogs";

export function useBootSequence() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (visibleLines >= BOOT_LOGS.length) {
      const timer = setTimeout(() => setIsComplete(true), 600);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(
      () => setVisibleLines((prev) => prev + 1),
      280 + Math.random() * 180
    );
    return () => clearTimeout(timer);
  }, [visibleLines]);

  const skip = useCallback(() => {
    setVisibleLines(BOOT_LOGS.length);
    setIsComplete(true);
  }, []);

  return { visibleLines, isComplete, skip, logs: BOOT_LOGS };
}
