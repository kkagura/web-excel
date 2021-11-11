import { createCacheFn, toNumber } from "../utils/utils";

interface BorderStyle {
  t?: Border;
  l?: Border;
  r?: Border;
  b?: Border;
}

interface Border {
  w?: number;
  t?: "solid" | "dashed";
  c?: "";
}

export interface CellData {
  r: string;
  c: string;
  v: string;
  raw: any;
  s?: {
    b?: BorderStyle;
  };
  hl?: "l" | "m" | "r";
  vl?: "t" | "m" | "b";
}

export interface ColData {
  i: string;
  l: number;
  w: number;
  f: boolean;
}

export interface RowData {
  i: string;
  t: number;
  h: number;
  f: boolean;
}

export interface Sheet {
  name: string;
  cells: CellData[];
  cols: ColData[];
  rows: RowData[];
}

interface State {
  name: string;
  currIdx: number;
  sheets: Sheet[];
  selected?: [[string, string], [string, string]];
}

export const state: State = {
  name: "Table",
  currIdx: 0,
  sheets: [
    {
      name: "Sheet1",
      cells: [],
      cols: [],
      rows: [],
    },
  ],
};

export function getCurrentSheet() {
  const { sheets, currIdx } = state;
  return sheets[currIdx];
}

export function getCellsByRowIdx(i: string) {
  const sheet = getCurrentSheet();
  const { cols, cells } = sheet;
  const cLen = cols.length;
  const n = toNumber(i) - 1;
  const start = n * cLen;
  return cells.slice(start, start + cLen);
}

export function getCellsByColIdx(i: string) {}

export const translateColIdx = createCacheFn<string, number>(
  (k: string): number => {
    return 0;
  }
);
