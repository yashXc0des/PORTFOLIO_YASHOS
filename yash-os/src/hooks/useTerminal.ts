"use client";

import { useCallback, useRef, useState } from "react";
import { TerminalHistory } from "@/types/terminal";
import { parseCommand } from "@/core/commandParser";

export const useTerminal = () => {
  const [history, setHistory] = useState<TerminalHistory[]>([]);
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);

  const executeCommand = useCallback((command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    const result = parseCommand(trimmed);

    if (result === "clear") {
      setHistory([]);
      return;
    }

    commandHistoryRef.current = [...commandHistoryRef.current, trimmed];
    historyIndexRef.current = commandHistoryRef.current.length;

    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        command: trimmed,
        output: result,
      },
    ]);
  }, []);

  const navigateHistory = useCallback((direction: "up" | "down"): string | null => {
    const cmds = commandHistoryRef.current;
    if (cmds.length === 0) return null;

    if (direction === "up") {
      historyIndexRef.current = Math.max(0, historyIndexRef.current - 1);
    } else {
      historyIndexRef.current = Math.min(cmds.length, historyIndexRef.current + 1);
    }

    if (historyIndexRef.current >= cmds.length) return "";
    return cmds[historyIndexRef.current] ?? "";
  }, []);

  return { history, executeCommand, navigateHistory };
};
