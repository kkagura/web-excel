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
import { clearRect, trigger } from "./Renderer";

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
  rowQueue.forEach((row) => renderRow(row));
  colQueue.forEach((col) => renderCol(col));
}

function renderCol(col: ColData) {
  const rect = getViewRect();
  const starty = rect.y;
  const headerRect = {
    x: col.left,
    y: 0,
    width: col.width,
    height: style.header.height,
  };
  // ctx.fillStyle = style.header.backgroundColor;
  ctx.fillStyle = getRandomColor();
  fillRect(ctx, headerRect);
  fillText(
    ctx,
    translateNumberToColIdx(col.i),
    { color: style.header.color, fontSize: style.header.fontSize },
    headerRect
  );
  const x = col.left + col.width - style.borderWidth / 2;
  const endy = rect.y + rect.height;
  line(ctx, [
    { x, y: starty },
    { x, y: endy },
  ]);
}

function renderRow(row: RowData) {
  const rect = getViewRect();

  const startx = rect.x;
  //  绘制头部
  const headerRect = {
    x: 0,
    y: row.top,
    width: style.header.width,
    height: row.height,
  };
  ctx.fillStyle = style.header.backgroundColor;
  fillRect(ctx, headerRect);
  fillText(
    ctx,
    row.i + 1 + "",
    { color: style.header.color, fontSize: style.header.fontSize },
    headerRect
  );
  let y = row.top + row.height - style.borderWidth / 2;
  const endx = rect.x + rect.width;
  line(ctx, [
    { x: startx, y },
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
