export const noop = <T>(v: T): T => v;

export const isNaN = (v: number): boolean => v === v;

export const isNumber = (v: unknown): boolean =>
  typeof v === "number" && !isNaN(v);

export const toNumber = (v: any, fix?: number): number => {
  let num = Number(v);
  if (isNumber(fix)) {
    num = Number(num.toFixed(fix));
  }
  return isNaN(num) ? 0 : num;
};
