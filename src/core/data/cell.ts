import { filter } from "../filter";
import { EventEmitter } from "./EventEmitter";

type ContentTypes = "string" | "number" | "checkbox";

interface Style {
  fontFamily?: string;
  fontWeight?:
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | "normal"
    | "bold"
    | "bolder"
    | "lighter";
  fontSize?: number;
  color?: string;
  align?: "left" | "right" | "center";
  textDecoration?: "overline" | "line-through" | "underline";
  backgroundColor?: string;
}

export interface CellData {
  status: "selected" | "hover" | "none";
  type: ContentTypes;
  value: unknown;
  normalStyle?: Style;
  hoverStyle?: Style;
  selectedStyle?: Style;
  template?: string;
  fix?: number;
  raw: string | boolean;
}

export class Cell extends EventEmitter {
  data: CellData = {
    status: "none",
    type: "string",
    value: "",
    raw: "",
  };
  colIdx: string = "";
  rowIdx: string = "";
  updated: boolean = true;
  constructor(rowIdx: string, colIdx: string) {
    super();
    this.rowIdx = rowIdx;
    this.colIdx = colIdx;
  }
  setValue(value: string) {
    if (this.data.raw === value) {
      return;
    }
    this.updated = false;
    this.data.raw = value;
  }
  getValue() {
    if (!this.updated) {
      this.data.value = filter(this.data);
    }
    return this.data.value;
  }
}
