import { CellData } from "./cell";

export interface ColumnData {
  index: string;
  data: {
    [key: string]: CellData;
  };
  width: number;
  selected: false;
  fixed: boolean;
}
