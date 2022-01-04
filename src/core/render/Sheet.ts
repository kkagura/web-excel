import { getContainerBounding } from "../../App";
import { style } from "../conf/default";
import {
  ColData,
  getCellsByRowIdx,
  getViewRect,
  RowData,
  state,
  translateNumberToColIdx,
} from "../store";
import { fillRect, fillText, line } from "../utils/draw";
import { getRandomColor } from "../utils/utils";
import { pushCell } from "./Cell";
import { clearRect, transform, trigger } from "./Renderer";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const rowQueue: Set<RowData> = new Set();
const colQueue: Set<ColData> = new Set();

export function resize() {
  const { width, height } = getContainerBounding();
  canvas.width = width;
  canvas.height = height;
}

export function render() {
  clearRect(ctx, getViewRect());
  ctx.save();
  transform(ctx);
  rowQueue.forEach((row) => renderRow(row));
  colQueue.forEach((col) => renderCol(col));
  ctx.restore();
}

function renderCol(col: ColData) {
  const rect = getViewRect();
  const y = rect.y;
  let x = Math.max(col.left, rect.x);
  const headerRect = {
    x,
    y,
    width: col.width,
    height: style.header.height,
  };
  // ctx.fillStyle = style.header.backgroundColor;
  ctx.fillStyle = getRandomColor();
  fillRect(ctx, headerRect);
  headerRect.x = col.left;
  fillText(
    ctx,
    translateNumberToColIdx(col.i),
    { color: style.header.color, fontSize: style.header.fontSize },
    headerRect
  );
  const endy = rect.y + rect.height;
  x = col.left + col.width - 0.5;
  line(ctx, [
    { x, y },
    { x, y: endy },
  ]);
}

function renderRow(row: RowData) {
  const rect = getViewRect();

  const x = rect.x;
  let y = Math.max(row.top, rect.y)
  //  绘制头部
  const headerRect = {
    x: rect.x,
    y,
    width: style.header.width,
    height: row.height,
  };
  ctx.fillStyle = style.header.backgroundColor;
  fillRect(ctx, headerRect);
  headerRect.y = row.top;
  fillText(
    ctx,
    row.i + 1 + "",
    { color: style.header.color, fontSize: style.header.fontSize },
    headerRect
  );
  y = row.height + row.top - 0.5;
  const endx = rect.x + rect.width;
  line(ctx, [
    { x, y },
    { x: endx, y },
  ]);
}

export function getSheetCanvas() {
  return canvas;
}

export function pushRow(row: RowData) {
  rowQueue.add(row);
  const i = row.i;
  const cells = getCellsByRowIdx(i);
  cells.forEach((c, colIdx) => {
    pushCell(c, i, colIdx);
  });
  trigger();
}

export function pushRows(rows: RowData[]) {
  rows.forEach((row) => pushRow(row));
}

export function pushCol(col: ColData) {
  colQueue.add(col);
  trigger();
}

export function pushCols(cols: ColData[]) {
  cols.forEach((col) => pushCol(col));
}

export function emptyQueue() {
  colQueue.clear();
  rowQueue.clear();
}
