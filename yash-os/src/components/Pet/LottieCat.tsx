"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { getAssetForState, CatState } from "./catConfig";

interface Props {
  state: CatState;
  size: number;
  onFailed?: () => void;
}

export default function LottieCat({ state, size, onFailed }: Props) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setAnimationData(null);

    fetch(getAssetForState(state))
      .then((res) => {
        if (!res.ok) throw new Error("Lottie file not found");
        return res.json();
      })
      .then((data) => {
        setAnimationData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        onFailed?.();
      });
  }, [state, onFailed]);

  if (loading) return <div style={{ width: size, height: size }} />;

  if (!animationData) return null;

  return (
    <div style={{ width: size, height: size }}>
      <Lottie
        animationData={animationData}
        loop
        style={{ width: size, height: size }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  );
}
