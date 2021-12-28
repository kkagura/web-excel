import { initData } from "./data/init";
import { run } from "./render/Renderer";
import { getCellRect, getCurrentSheet, state } from "./store";
import { loadTools } from "./store/tools";
import { attr } from "./utils/dom";

export function init(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  ctx && run(ctx);
  const { width, height } = (
    canvas.parentElement as HTMLElement
  ).getBoundingClientRect();
  attr(canvas, "width", width + "");
  attr(canvas, "height", height + "");
  state.viewRect.width = width;
  state.viewRect.height = height;
  initData();
}

interface Option {
  tools?: string[][];
}

export function config(option: Option) {
  if (option.tools?.length) {
    loadTools(option.tools);
  }
}

export function getCellIndexAt(point: { x: number; y: number }) {
  let colIdx: number = -1,
    rowIdx: number = -1;
  const { rows, cols, rowCount, colCount } = getCurrentSheet();
  for (let i = 0; i < rowCount; i++) {
    const row = rows[i];
    if (point.y >= row.top && point.y < row.top + row.height) {
      rowIdx = i;
      break;
    }
  }
  for (let i = 0; i < colCount; i++) {
    const col = cols[i];
    if (point.x >= col.left && point.x < col.left + col.width) {
      colIdx = i;
      break;
    }
  }
  if (colIdx < 0 || rowIdx < 0) {
    return null;
  }
  return { colIdx, rowIdx };
}
