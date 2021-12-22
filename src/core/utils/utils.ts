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
