import { ref, type Ref } from 'vue';

export type scatterPoint = { x: number; y: number; size: number };

type scatterOptions = {
  count: number;
  // Per-dot visual diameters (px). Used both to render and to keep dots from
  // overlapping (spacing is measured edge-to-edge from these radii).
  sizes: number[];
  // Minimum edge-to-edge gap between two dots (px).
  gap?: number;
  // Inset from the container edges so dots don't clip (px).
  padding?: number;
  // Extra top inset — reserves space above the cluster (px).
  topInset?: number;
  // 0–1: how much of the available area the cluster spans, centered. Lower =
  // tighter huddle in the middle (matches the reference grouping).
  spread?: number;
  // Max rejection-sampler attempts per dot before we relax and accept.
  maxTries?: number;
};

// Poisson-disc-style rejection sampler, biased toward the container centre so
// the dots read as one loose cluster (not an edge-to-edge spread). Picks random
// points inside a centred sub-region, rejecting any that overlap an already
// placed dot (edge-to-edge gap < `gap`). If it can't satisfy spacing after
// `maxTries`, it accepts the best-effort candidate so we always return `count`
// points.
export function generateScatteredPositions(
  width: number,
  height: number,
  opts: scatterOptions,
): scatterPoint[] {
  const {
    count,
    sizes,
    gap = 22,
    padding = 16,
    topInset = 0,
    spread = 0.72,
    maxTries = 80,
  } = opts;

  const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
  const points: scatterPoint[] = [];

  // Centred sampling window: full safe box shrunk toward its centre by `spread`.
  const safeLeft = padding;
  const safeRight = width - padding;
  const safeTop = padding + topInset;
  const safeBottom = height - padding;
  const cx = (safeLeft + safeRight) / 2;
  const cy = (safeTop + safeBottom) / 2;
  const halfW = ((safeRight - safeLeft) / 2) * spread;
  const halfH = ((safeBottom - safeTop) / 2) * spread;

  const farEnough = (p: scatterPoint) =>
    points.every((q) => {
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const need = p.size / 2 + q.size / 2 + gap;
      return dx * dx + dy * dy >= need * need;
    });

  for (let i = 0; i < count; i++) {
    const size = sizes[i] ?? 56;
    const r = size / 2;
    // Clamp the point so the whole dot stays inside the safe box.
    const minX = Math.max(safeLeft + r, cx - halfW);
    const maxX = Math.min(safeRight - r, cx + halfW);
    const minY = Math.max(safeTop + r, cy - halfH);
    const maxY = Math.min(safeBottom - r, cy + halfH);

    let placed: scatterPoint | null = null;
    let best: scatterPoint | null = null;
    let bestDist = -1;

    for (let t = 0; t < maxTries; t++) {
      const cand = { x: rand(minX, maxX), y: rand(minY, maxY), size };
      if (farEnough(cand)) {
        placed = cand;
        break;
      }
      const nearest = points.reduce((m, q) => {
        const dx = cand.x - q.x;
        const dy = cand.y - q.y;
        return Math.min(m, dx * dx + dy * dy);
      }, Infinity);
      if (nearest > bestDist) {
        bestDist = nearest;
        best = cand;
      }
    }

    points.push(
      placed ?? best ?? { x: rand(minX, maxX), y: rand(minY, maxY), size },
    );
  }

  return points;
}

// Vue composable wrapper: generates positions once for the given container
// size and memoizes them, so re-renders don't reshuffle the layout. Call
// `regenerate(w, h)` (e.g. after a resize) to lay out for new dimensions.
export function useScatteredPositions(
  count: number,
  opts: Omit<scatterOptions, 'count'>,
): {
  positions: Ref<scatterPoint[]>;
  regenerate: (width: number, height: number) => void;
} {
  const positions = ref<scatterPoint[]>([]);
  let lastKey = '';

  const regenerate = (width: number, height: number) => {
    if (width <= 0 || height <= 0) return;
    // Round to a coarse grid so sub-pixel resize jitter doesn't re-roll.
    const key = `${Math.round(width / 8)}x${Math.round(height / 8)}`;
    if (key === lastKey && positions.value.length === count) return;
    lastKey = key;
    positions.value = generateScatteredPositions(width, height, {
      count,
      ...opts,
    });
  };

  return { positions, regenerate };
}
