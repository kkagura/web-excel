import { style } from "../conf/default";
import { CellMap } from "./CellMap";

export class Column extends CellMap {
  width: number = style.colWidth;
}
