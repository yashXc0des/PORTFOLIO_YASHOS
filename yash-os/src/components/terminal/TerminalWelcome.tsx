"use client";

import { QUICK_COMMANDS, WELCOME as WELCOME_TEXT } from "@/data/welcome";

interface Props {
  onCommand: (cmd: string) => void;
  disabled?: boolean;
}

export default function TerminalWelcome({ onCommand, disabled }: Props) {
  return (
    <div className="mb-3 shrink-0 space-y-3 border-b border-green-500/20 pb-4">
      <div className="space-y-1">
        <p className="text-base font-bold text-green-400 md:text-lg">
          visitor@fintech-core:~$ welcome
        </p>
        <p className="text-base text-green-300 md:text-lg">{WELCOME_TEXT.greeting}</p>
        <p className="text-sm text-green-500 md:text-base">{WELCOME_TEXT.bio}</p>
      </div>

      <div>
        <p className="mb-2 text-sm font-bold text-cyan-400 md:text-base">
          Try these commands:
        </p>
        <div className="flex flex-wrap gap-2">
          {QUICK_COMMANDS.map(({ cmd, hint }) => (
            <button
              key={cmd}
              type="button"
              disabled={disabled}
              onClick={() => onCommand(cmd)}
              className="rounded border border-green-500/40 bg-[#0a0f1a] px-2.5 py-1 font-mono text-sm text-green-400 transition-colors hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-40 md:text-base"
              title={hint}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
