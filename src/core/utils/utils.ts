import { Rect } from "./draw";

export const noop = <T>(v: T): T => v;

export const isNaN = (v: number): boolean => v !== v;

export const isNumber = (v: unknown): boolean =>
  typeof v === "number" && !isNaN(v);

export const toNumber = (v: any, fix?: number): number => {
  let num = Number(v);
  if (isNumber(fix)) {
    num = Number(num.toFixed(fix));
  }
  return isNaN(num) ? 0 : num;
};

export const isArrayIdx = (i: any): boolean => {
  if (typeof i === "string") {
    i = parseFloat(i);
  }
  if (typeof i === "number") {
    return !isNaN(i) && parseInt(i + "") === i;
  }
  return false;
};

export const createCacheFn = <T, M>(fn: (k: T) => M) => {
  const cache: Map<T, M> = new Map();
  return (k: T) => {
    if (cache.has(k)) {
      return cache.get(k) as M;
    }
    const v = fn(k);
    cache.set(k, v);
    return v;
  };
};

export function getCellValue(raw: any): string {
  return String(raw);
}

export function getRandomColor() {
  return "#" + (~~(Math.random() * (1 << 24))).toString(16);
}

export function binarySearch<T>(
  arr: T[],
  filter: (item: T) => number
): null | T {
  if (!arr.length) {
    return null;
  }
  if (arr.length === 1) {
    return filter(arr[0]) === 0 ? arr[0] : null;
  }
  const half = Math.floor(arr.length / 2);
  const mid = arr[half];
  const res = filter(mid);
  if (res === 0) {
    return mid;
  }
  if (res < 0) {
    return binarySearch(arr.slice(0, half), filter);
  }
  return binarySearch(arr.slice(half), filter);
}

export function intersect(rect1: Rect, rect2: Rect) {
  const minx = Math.max(rect1.x, rect2.x);
  const miny = Math.max(rect1.y, rect1.y);
  const maxx = Math.min(rect1.x + rect1.width, rect2.x + rect2.width);
  const maxy = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
  return minx <= maxx && miny <= maxy;
}
