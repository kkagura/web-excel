import { filter } from "../filter";
import { noop } from "../utils/utils";

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

export class Cell {
  data: CellData = {
    status: "none",
    type: "string",
    value: "",
    raw: "",
  };
  updated: boolean = true;
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
