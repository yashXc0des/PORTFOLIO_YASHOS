"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface TerminalInputHandle {
  focus: () => void;
}

interface Props {
  onCommand: (command: string) => void;
  navigateHistory: (direction: "up" | "down") => string | null;
  disabled?: boolean;
}

const TerminalInput = forwardRef<TerminalInputHandle, Props>(function TerminalInput(
  { onCommand, navigateHistory, disabled = false },
  ref
) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = useCallback(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  useImperativeHandle(ref, () => ({ focus: focusInput }), [focusInput]);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onCommand(input);
      setInput("");
      requestAnimationFrame(focusInput);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = navigateHistory("up");
      if (prev !== null) setInput(prev);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = navigateHistory("down");
      if (next !== null) setInput(next);
    }
  };

  return (
    <div
      className="relative flex cursor-text items-center text-base text-cyan-400 md:text-lg"
      onClick={focusInput}
      role="presentation"
    >
      <span className="shrink-0 select-none">visitor@fintech-core:~$</span>

      {/* Visible typed text + cursor */}
      <span className="pointer-events-none ml-2 inline-flex items-center text-green-400">
        <span>{input}</span>
        <span className="cursor-blink h-[1.1em] w-2.5 shrink-0 bg-green-400" />
      </span>

      {/* Full-width invisible input — always captures clicks & keys */}
      <input
        ref={inputRef}
        autoFocus
        disabled={disabled}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 cursor-text opacity-0"
        spellCheck={false}
        autoComplete="off"
        aria-label="Terminal command input"
      />
    </div>
  );
});

export default TerminalInput;
