"use client";

import { useEffect, useState } from "react";
import PixelCat from "./PixelCat";
import LucySpeechBubble from "./LucySpeechBubble";
import { LUCY_NAME, LUCY_QUOTES, QUOTE_INTERVAL_MS } from "@/data/lucyQuotes";

export default function LucyPanel() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % LUCY_QUOTES.length);
    }, QUOTE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-full min-h-0 items-stretch gap-2 p-2">
      {/* Lucy — bottom left */}
      <div className="relative w-[130px] shrink-0 self-end">
        <div className="relative h-[130px] w-[130px] overflow-visible">
          <PixelCat />
        </div>
        <div className="mt-1 text-center font-mono text-xs tracking-widest text-green-500 uppercase">
          {LUCY_NAME}
        </div>
      </div>

      {/* Quote box — fills rest of panel */}
      <div className="min-h-0 flex-1 self-stretch py-1">
        <LucySpeechBubble quote={LUCY_QUOTES[quoteIndex]} />
      </div>
    </div>
  );
}
