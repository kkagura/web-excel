import { trigger } from "../render/Renderer";
import { addCol, addRow } from "../store";

export function initData() {
  const colCount = 5;
  const rowCount = 5;
  for (let i = 0; i < colCount; i++) {
    addCol(i, false);
  }
  for (let i = 0; i < rowCount; i++) {
    addRow(i);
  }
  trigger(true);
}
