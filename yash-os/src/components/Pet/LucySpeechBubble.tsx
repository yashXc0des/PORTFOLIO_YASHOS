"use client";

import { AnimatePresence, motion } from "framer-motion";

interface Props {
  quote: string;
}

export default function LucySpeechBubble({ quote }: Props) {
  return (
    <div className="relative h-full w-full min-h-[140px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={quote}
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -4 }}
          transition={{ duration: 0.25 }}
          className="lucy-bubble relative flex h-full w-full flex-col justify-center rounded border border-green-500/50 bg-[#050816] px-4 py-4 font-mono text-sm leading-relaxed text-green-300 md:text-base"
        >
          <span
            className="absolute top-1/2 -left-1.5 h-3 w-3 -translate-y-1/2 rotate-[135deg] border-r border-b border-green-500/50 bg-[#050816]"
            aria-hidden
          />

          <span className="mb-2 block text-base font-bold text-cyan-400 md:text-lg">&gt; Lucy:</span>
          <span className="text-green-300">{quote}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
