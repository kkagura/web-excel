import { Coord } from "../store";

export interface Op {
  sheet: number;
  type: "del" | "insert" | "update";
  target: "row" | "col" | "sheet" | "cell";
  index: number | Coord;
  oldVal: any;
  newVal: any;
  path: any[];
}

const ops: Array<Op | Op[]> = [];

export function execut(op: Op) {}
