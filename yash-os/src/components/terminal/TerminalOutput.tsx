"use client";

import { motion } from "framer-motion";
import { TerminalHistory } from "@/types/terminal";
import TerminalLine from "./TerminalLine";

interface Props {
  history: TerminalHistory[];
  onContentUpdate?: () => void;
}

export default function TerminalOutput({ history, onContentUpdate }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="mt-4">
      {history.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-4"
        >
          <div className="text-base font-bold text-cyan-400 md:text-lg">
            visitor@fintech-core:~$ {item.command}
          </div>
          <div className="mt-1 pl-2">
            {Array.isArray(item.output) ? (
              item.output.map((line, idx) => (
                <TerminalLine
                  key={idx}
                  text={line}
                  animate={index === history.length - 1}
                  delay={idx * 0.02}
                  onUpdate={onContentUpdate}
                />
              ))
            ) : (
              <TerminalLine
                text={item.output}
                animate={index === history.length - 1}
                onUpdate={onContentUpdate}
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
