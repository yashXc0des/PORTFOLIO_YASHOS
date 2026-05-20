"use client";

import { TerminalHistory } from "@/types/terminal";
import TerminalLine from "./TerminalLine";

interface Props {
  history: TerminalHistory[];
}

export default function TerminalOutput({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="space-y-4 pt-2">
      {history.map((item) => (
        <div key={item.id} className="terminal-entry">
            <div className="text-base font-bold text-cyan-400 md:text-lg">
              visitor@fintech-core:~$ {item.command}
            </div>
            <div className="mt-1 pl-2">
              {Array.isArray(item.output) ? (
                item.output.map((line, idx) => (
                  <TerminalLine key={idx} text={line} animate={false} />
                ))
              ) : (
                <TerminalLine text={item.output} animate={false} />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
