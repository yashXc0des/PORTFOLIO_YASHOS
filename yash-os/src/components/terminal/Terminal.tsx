"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTerminal } from "@/hooks/useTerminal";
import CRTEffects from "@/components/effects/CRTEffects";
import MatrixAmbience from "@/components/effects/MatrixAmbience";
import PixelDeskScene from "@/components/scene/PixelDeskScene";
import BootSequence from "./BootSequence";
import TerminalInput, { TerminalInputHandle } from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";
import TerminalWelcome from "./TerminalWelcome";

export default function Terminal() {
  const [booted, setBooted] = useState(false);
  const { history, executeCommand, navigateHistory } = useTerminal();
  const inputRef = useRef<TerminalInputHandle>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldStickRef = useRef(true);

  const handleBootComplete = useCallback(() => setBooted(true), []);
  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
    bottomRef.current?.scrollIntoView({ behavior, block: "end" });
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    shouldStickRef.current = distanceFromBottom < 80;
  }, []);

  useLayoutEffect(() => {
    if (!shouldStickRef.current) return;
    scrollToBottom("instant");
  }, [history, scrollToBottom]);

  const handleCommand = useCallback(
    (command: string) => {
      shouldStickRef.current = true;
      executeCommand(command);
      requestAnimationFrame(() => scrollToBottom("instant"));
      setTimeout(() => scrollToBottom("smooth"), 50);
    },
    [executeCommand, scrollToBottom]
  );

  useEffect(() => {
    if (booted) {
      const timer = setTimeout(focusInput, 100);
      return () => clearTimeout(timer);
    }
  }, [booted, focusInput]);

  useEffect(() => {
    if (!booted) return;

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const isPrintable = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
      const isTerminalKey =
        isPrintable ||
        e.key === "Backspace" ||
        e.key === "Enter" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown";

      if (isTerminalKey) focusInput();
    };

    window.addEventListener("keydown", handleWindowKeyDown);
    return () => window.removeEventListener("keydown", handleWindowKeyDown);
  }, [booted, focusInput]);

  const handleShellMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!booted) return;
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) return;
      e.preventDefault();
      focusInput();
    },
    [booted, focusInput]
  );

  return (
    <div className="scanlines relative flex h-dvh w-full overflow-hidden bg-[#050816] font-mono text-base text-green-400 md:flex-row md:text-lg">
      <MatrixAmbience />
      <CRTEffects />

      <AnimatePresence>
        {!booted && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {/* Left: full-width terminal on mobile, 70% on desktop */}
      <motion.section
        data-terminal-shell
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex h-full min-h-0 w-full flex-col overflow-hidden md:w-[70%]"
        onMouseDown={handleShellMouseDown}
      >
        {/* Scrollable history — old messages scroll up */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="terminal-output min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pt-4 md:px-6 md:pt-6 lg:px-8 lg:pt-8"
        >
          <header className="mb-4 md:mb-6">
            <pre className="text-green-500 text-[10px] leading-tight sm:text-xs md:text-sm lg:text-base">
{`██╗   ██╗ █████╗ ███████╗██╗  ██╗
╚██╗ ██╔╝██╔══██╗██╔════╝██║  ██║
 ╚████╔╝ ███████║███████╗███████║
  ╚██╔╝  ██╔══██║╚════██║██╔══██║
   ██║   ██║  ██║███████║██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`}
            </pre>
            <div className="mt-2 text-lg font-bold text-cyan-400 md:text-xl">YashOS v1.0</div>
            <div className="text-base text-green-500 md:text-lg">Full Stack Engineer Terminal</div>
          </header>

          <TerminalWelcome onCommand={handleCommand} disabled={!booted} />

          <TerminalOutput history={history} />

          <div ref={bottomRef} className="h-px shrink-0" aria-hidden />
        </div>

        {/* Input pinned at bottom — always visible */}
        <div className="shrink-0 border-t border-green-500/20 bg-[#050816] px-4 py-3 md:px-6 lg:px-8">
          <TerminalInput
            ref={inputRef}
            onCommand={handleCommand}
            navigateHistory={navigateHistory}
            disabled={!booted}
          />
        </div>
      </motion.section>

      {/* Right panel — desktop only, hidden on phone */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: booted ? 1 : 0, x: booted ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 hidden h-full min-h-0 w-[30%] flex-col overflow-hidden border-l border-cyan-500/10 md:flex"
      >
        <PixelDeskScene active={booted} />
      </motion.aside>
    </div>
  );
}
