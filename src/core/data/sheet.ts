import { Cell } from "./Cell";
import { Column } from "./Column";
import { EventEmitter } from "./EventEmitter";
import { Row } from "./Row";

export class Sheet extends EventEmitter {
  name: string = "";
  rows: Map<string, Row> = new Map();
  cols: Map<string, Column> = new Map();
  constructor(name = "Sheet1") {
    super();
    this.name = name;
  }
  initData() {
    const { rows, cols } = this;
    for (let i = 1; i < 101; i++) {
      // const row: Map<string, Cell> = new Map();
      const row = new Row();
      const rowIdx = i + "";
      rows.set(rowIdx, row);
      for (let j = 65; j < 91; j++) {
        const colIdx = String.fromCharCode(j);
        const cell = new Cell(rowIdx, colIdx);
        row.set(colIdx, cell);
        if (i === 1) {
          if (cols.has(colIdx)) {
            const col = cols.get(colIdx);
            col?.set(rowIdx, cell);
          } else {
            const col = new Column();
            col.set(rowIdx, cell);
            cols.set(colIdx, col);
          }
        }
      }
    }
  }
}
