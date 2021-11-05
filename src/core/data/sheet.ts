import { CellData } from "./cell";
import { ColumnData } from "./column";
import { RowData } from "./row";

const cols: string[] = [];
for (let i = 65; i < 91; i++) {
  cols.push(String.fromCharCode(i));
}

const rows: string[] = [];

for (let i = 1; i < 101; i++) {
  rows.push(i + "");
}

export interface SheetData {
  rows: RowData[];
  columns: ColumnData[];
  data: CellData[][];
}

export class Sheet {
  initData() {}
}
