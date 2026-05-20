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
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldStickRef = useRef(true);

  const handleBootComplete = useCallback(() => setBooted(true), []);
  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const scrollPanelToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = panelRef.current;
    if (!el || !shouldStickRef.current) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  const handlePanelScroll = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    shouldStickRef.current = distanceFromBottom < 100;
  }, []);

  useLayoutEffect(() => {
    shouldStickRef.current = true;
    scrollPanelToBottom("instant");
  }, [history, scrollPanelToBottom]);

  useEffect(() => {
    if (history.length === 0) return;
    const timers = [50, 150, 400, 800].map((ms) =>
      setTimeout(() => scrollPanelToBottom("smooth"), ms)
    );
    return () => timers.forEach(clearTimeout);
  }, [history, scrollPanelToBottom]);

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
    <div className="scanlines relative flex h-dvh w-full flex-col overflow-hidden bg-[#050816] font-mono text-base text-green-400 md:flex-row md:text-lg">
      <MatrixAmbience />
      <CRTEffects />

      <AnimatePresence>
        {!booted && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      <motion.section
        data-terminal-shell
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex min-h-0 w-full flex-1 flex-col overflow-hidden md:w-[70%]"
        onMouseDown={handleShellMouseDown}
      >
        <div
          ref={panelRef}
          onScroll={handlePanelScroll}
          className="terminal-output min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8"
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

          <TerminalWelcome onCommand={executeCommand} disabled={!booted} />

          <TerminalInput
            ref={inputRef}
            onCommand={executeCommand}
            navigateHistory={navigateHistory}
            disabled={!booted}
          />

          <TerminalOutput
            history={history}
            onContentUpdate={() => scrollPanelToBottom("instant")}
          />
        </div>
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: booted ? 1 : 0, x: booted ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 hidden flex-col border-t border-cyan-500/10 md:flex md:w-[30%] md:border-t-0 md:border-l"
      >
        <PixelDeskScene active={booted} />
      </motion.aside>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 h-48 shrink-0 border-t border-cyan-500/10 md:hidden"
      >
        <PixelDeskScene active={booted} />
      </motion.div>
    </div>
  );
}
