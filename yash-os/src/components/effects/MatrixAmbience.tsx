"use client";

const CHARS = "01アイウエオカキクケコ";

export default function MatrixAmbience() {
  return (
    <div className="matrix-ambience pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="matrix-column absolute top-0 text-xs leading-none text-green-500/5 font-mono"
          style={{
            left: `${(i / 12) * 100}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${8 + (i % 4) * 2}s`,
          }}
        >
          {Array.from({ length: 20 }).map((__, j) => (
            <div key={j}>{CHARS[(i + j) % CHARS.length]}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
