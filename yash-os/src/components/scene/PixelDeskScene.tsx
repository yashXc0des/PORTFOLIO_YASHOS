"use client";

import LucyPanel from "../Pet/LucyPanel";
import SystemInfoPanel from "../panel/SystemInfoPanel";
import { CAT_HOUSE } from "../Pet/catConfig";

interface Props {
  active?: boolean;
}

export default function PixelDeskScene({ active = true }: Props) {
  return (
    <div className="relative flex h-full min-h-[320px] w-full flex-col overflow-hidden bg-[#030610] md:min-h-0">
      {/* Desk area */}
      <div className="relative shrink-0 p-4 pb-2">
        <div className="relative mx-auto w-full max-w-[280px]">
          {/* Shelf */}
          <div className="absolute top-0 left-2 right-2 h-2.5 bg-[#1a2035] border border-[#2a3555]" />
          <div className="absolute top-0 left-4 h-6 w-0.5 bg-[#2a3555]" />
          <div className="absolute top-0 right-4 h-6 w-0.5 bg-[#2a3555]" />

          {/* Plant on shelf */}
          <div className="absolute top-1 left-8 z-10">
            <div className="flex gap-0.5 justify-center">
              <div className="h-2 w-1.5 bg-green-600/80 rounded-sm" />
              <div className="h-3 w-1.5 bg-green-500/80 rounded-sm" />
            </div>
            <div className="mx-auto h-2 w-1.5 bg-[#3d4a6a] border border-[#4a5880]" />
          </div>

          {/* Cat house on shelf */}
          <div className="absolute z-20" style={{ left: CAT_HOUSE.x + 40, top: 4 }}>
            <div className="relative">
              <div className="h-9 w-12 bg-[#5c4030] border-2 border-[#7a5840] rounded-t-md">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#6b4a35]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-5 w-7 bg-[#2a1a10] rounded-t-full border border-[#7a5840]" />
              </div>
              <div className="text-center text-[5px] text-green-500/50 font-mono mt-0.5 tracking-wider">
                LUCY HUB
              </div>
            </div>
          </div>

          {/* Lamp */}
          <div className="absolute top-2 right-0 z-10">
            <div className="h-6 w-0.5 bg-[#4a5880] mx-auto" />
            <div className="h-2.5 w-5 bg-[#5a6880] rounded-sm mx-auto border border-[#6a7890]" />
          </div>

          {/* Monitor */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10">
            <div className="relative border-2 border-[#2a3555] bg-[#0a0f1a] p-0.5">
              <div className="h-14 w-20 overflow-hidden bg-[#020810]">
                <div className="p-1 font-mono text-[4px] text-green-400/90 leading-tight">
                  <div>$ yash --status</div>
                  <div className="text-cyan-400">ONLINE</div>
                  <div className="text-green-500/60">████</div>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-0.5 h-1.5 w-6 bg-[#1a2035] border border-[#2a3555]" />
            <div className="mx-auto h-0.5 w-10 bg-[#2a3555]" />
          </div>

          {/* Desk surface */}
          <div className="absolute top-[88px] left-0 right-0 h-3 bg-[#1a2035] border-t-2 border-[#2a3555]" />

          {/* Desk body */}
          <div className="absolute top-[100px] left-0 right-0 h-16 bg-[#12182a] border-x-2 border-[#1a2035]">
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <div className="flex flex-col gap-px p-0.5 bg-[#0a0f1a] border border-[#2a3555]">
                {[0, 1, 2].map((row) => (
                  <div key={row} className="flex gap-px">
                    {Array.from({ length: row === 2 ? 7 : 9 }).map((_, i) => (
                      <div key={i} className="h-1 w-1.5 bg-[#1a2540] border border-[#2a3555]/50" />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 right-6">
              <div className="h-4 w-3 bg-[#1a1a1a] border border-[#333] rounded-sm" />
              <div className="absolute top-1 left-0.5 text-[4px] text-green-400 font-mono">&lt;/&gt;</div>
            </div>
          </div>

          {/* Desk legs */}
          <div className="absolute top-[164px] left-2 right-2 flex justify-between">
            <div className="h-4 w-1.5 bg-[#1a2035] border border-[#2a3555]" />
            <div className="h-4 w-1.5 bg-[#1a2035] border border-[#2a3555]" />
          </div>
        </div>

        {/* spacer for absolute desk height */}
        <div className="h-[180px]" />
      </div>

      {/* SYS INFO — below desktop */}
      <SystemInfoPanel active={active} />

      {/* Lucy panel */}
      <div className="relative mx-3 mb-3 mt-1 min-h-[190px] flex-1 overflow-visible rounded border border-[#1a2540] bg-[#0a0e18]">
        <div className="absolute inset-1 rounded-sm border border-[#151c2e] bg-[#0d1220]" />
        <div className="absolute inset-x-3 bottom-1 h-px bg-[#1a2540]/60" />
        <div className="absolute inset-1 overflow-visible">
          <LucyPanel />
        </div>
      </div>
    </div>
  );
}
