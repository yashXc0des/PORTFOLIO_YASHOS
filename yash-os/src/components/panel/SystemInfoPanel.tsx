"use client";

import { motion } from "framer-motion";
import { useUptime } from "@/hooks/useUptime";
import { SYSTEM_INFO } from "@/data/systemInfo";

interface Props {
  active: boolean;
}

export default function SystemInfoPanel({ active }: Props) {
  const uptime = useUptime(active);

  const rows = [
    { label: "OS", value: SYSTEM_INFO.os },
    { label: "Version", value: SYSTEM_INFO.version },
    { label: "Shell", value: SYSTEM_INFO.shell },
    { label: "Terminal", value: SYSTEM_INFO.terminal },
    { label: "Status", value: SYSTEM_INFO.status, highlight: true },
    { label: "Uptime", value: uptime, mono: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="system-panel mx-3 mb-2 w-auto shrink-0 rounded border border-cyan-500/40 bg-[#050816] p-3 font-mono text-sm md:text-base"
    >
      <div className="mb-2 border-b border-cyan-500/30 pb-2 text-base font-bold text-cyan-400">
        {"// SYS_INFO"}
      </div>

      {rows.map((row) => (
        <div key={row.label} className="mb-1.5 flex justify-between gap-2">
          <span className="text-green-500">{row.label}:</span>
          <span
            className={`text-right ${
              row.highlight
                ? "font-bold text-green-400"
                : row.mono
                  ? "text-cyan-300"
                  : "text-green-300"
            }`}
          >
            {row.value}
          </span>
        </div>
      ))}

      <div className="mt-2 flex items-center gap-2 border-t border-cyan-500/30 pt-2">
        <span className="status-led h-2 w-2 shrink-0 rounded-full bg-green-400" />
        <span className="text-green-500">All systems nominal</span>
      </div>
    </motion.div>
  );
}
