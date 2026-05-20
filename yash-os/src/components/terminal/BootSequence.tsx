"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useBootSequence } from "@/hooks/useBootSequence";

interface Props {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: Props) {
  const { visibleLines, isComplete, skip, logs } = useBootSequence();

  useEffect(() => {
    if (isComplete) onComplete();
  }, [isComplete, onComplete]);

  if (isComplete) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-end bg-[#020408] p-6 font-mono text-base md:p-10 md:text-lg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={skip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && skip()}
    >
      <div className="mb-4 text-sm text-green-500 md:text-base">YashOS Secure Boot v1.0</div>

      {logs.slice(0, visibleLines).map((log, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-1 text-green-400"
        >
          <span className="text-cyan-400">[ {log.status} ]</span> {log.message}
        </motion.div>
      ))}

      <span className="mt-2 inline-block h-5 w-2.5 animate-pulse bg-green-400" />

      <div className="mt-6 text-sm text-green-500 md:text-base">click or press Enter to skip</div>
    </motion.div>
  );
}
