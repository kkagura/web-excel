import { CellData } from "./cell";

export interface RowData {
  index: string;
  data: {
    [key: string]: CellData;
  };
  fixed: boolean;
  height: number;
  selected: boolean;
}
