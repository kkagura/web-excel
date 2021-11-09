import { Cell } from "./Cell";
import { EventEmitter } from "./EventEmitter";

export class CellMap extends EventEmitter {
  index: string = "";
  data: Map<string, Cell> = new Map();
  selected: boolean = false;
  fixed: boolean = false;
  set(key: string, cell: Cell) {
    this.data.set(key, cell);
  }
  has(key: string): boolean {
    return this.data.has(key);
  }
}