"use client";

import { useEffect, useState } from "react";

interface Props {
  text: string;
  animate?: boolean;
  delay?: number;
  onUpdate?: () => void;
}

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function renderLine(text: string) {
  const parts = text.split(URL_REGEX);
  if (parts.length === 1) return text;

  return parts.map((part, i) =>
    part.startsWith("http") ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200 transition-colors"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

function LineContent({ text }: { text: string }) {
  const isProjectCard =
    text.startsWith("┌─") || text.startsWith("│") || text.startsWith("└");

  return (
    <div
      className={`leading-8 whitespace-pre-wrap break-words text-base md:text-lg ${
        isProjectCard ? "project-card-line" : ""
      }`}
    >
      {renderLine(text)}
    </div>
  );
}

function TypingLine({
  text,
  delay,
  onUpdate,
}: {
  text: string;
  delay: number;
  onUpdate?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        onUpdate?.();
        if (i >= text.length) clearInterval(interval);
      }, 8);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval!);
    };
  }, [text, delay, onUpdate]);

  const isProjectCard =
    text.startsWith("┌─") || text.startsWith("│") || text.startsWith("└");

  return (
    <div
      className={`leading-8 whitespace-pre-wrap break-words text-base md:text-lg ${
        isProjectCard ? "project-card-line" : ""
      }`}
    >
      {renderLine(displayed)}
    </div>
  );
}

export default function TerminalLine({
  text,
  animate = false,
  delay = 0,
  onUpdate,
}: Props) {
  if (animate) return <TypingLine text={text} delay={delay} onUpdate={onUpdate} />;
  return <LineContent text={text} />;
}
