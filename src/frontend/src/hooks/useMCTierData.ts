import { useCallback, useEffect, useRef, useState } from "react";

export interface MCTierData {
  position: number;
  points: number;
  title: string;
  tiers: { name: string; rating: string }[];
  loading: boolean;
  error: boolean;
  lastUpdated: Date | null;
}

const FALLBACK: Omit<MCTierData, "loading" | "error" | "lastUpdated"> = {
  position: 79466,
  points: 2,
  title: "Rookie",
  tiers: [
    { name: "crystal", rating: "LT5" },
    { name: "mace", rating: "LT5" },
  ],
};

const REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

async function fetchMCTierData(): Promise<
  Omit<MCTierData, "loading" | "error" | "lastUpdated">
> {
  const response = await fetch(
    "https://mctier.com/api/v1/players/Akgamer4354",
    {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    },
  );

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();

  const tiers: { name: string; rating: string }[] = [];

  if (data.crystal !== undefined && data.crystal !== null) {
    tiers.push({ name: "crystal", rating: data.crystal || "LT5" });
  }
  if (data.mace !== undefined && data.mace !== null) {
    tiers.push({ name: "mace", rating: data.mace || "LT5" });
  }

  const finalTiers =
    tiers.length > 0
      ? tiers
      : [
          { name: "crystal", rating: "LT5" },
          { name: "mace", rating: "LT5" },
        ];

  return {
    position: data.position ?? data.overall_position ?? FALLBACK.position,
    points: data.points ?? data.score ?? FALLBACK.points,
    title: data.title ?? data.rank ?? FALLBACK.title,
    tiers: finalTiers,
  };
}

export function useMCTierData(): MCTierData {
  const [state, setState] = useState<MCTierData>({
    ...FALLBACK,
    loading: true,
    error: false,
    lastUpdated: null,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: false }));
    try {
      const data = await fetchMCTierData();
      setState({
        ...data,
        loading: false,
        error: false,
        lastUpdated: new Date(),
      });
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: true,
      }));
    }
  }, []);

  useEffect(() => {
    load();
    intervalRef.current = setInterval(load, REFRESH_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [load]);

  return state;
}
