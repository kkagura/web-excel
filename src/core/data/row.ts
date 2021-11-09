import { style } from "../conf/default";
import { CellMap } from "./CellMap";

export class Row extends CellMap {
  height: number = style.rowHeight;
}
