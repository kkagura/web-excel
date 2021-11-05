import { CellData } from "../data/cell";
import { toNumber } from "../utils/utils";

export function filter(value: CellData): any {
  if (value.type === "string") {
    return value.raw;
  } else if (value.type === "number") {
    return toNumber(value.raw);
  } else if (value.type === "checkbox") {
    return !!value.raw;
  }
  return null;
}
