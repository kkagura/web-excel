import { style } from "../conf/default";
import { ColData, getCellsByRowIdx, RowData, state, translateNumberToColIdx } from "../store";
import { fillRect, fillText, line } from "../utils/draw";
import { getRandomColor } from "../utils/utils";
import { pushCell } from "./Cell";
import { clearRect } from "./Renderer";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const rowQueue: Set<RowData> = new Set();
const colQueue: Set<ColData> = new Set();

let updateFlag = false;

export function renderGrid() {
  if (updateFlag) {
    canvas.width = state.viewRect.width;
    canvas.height = state.viewRect.height;
    clearRect(ctx, state.viewRect);
    rowQueue.forEach((row) => renderRow(row));
    colQueue.forEach((col) => renderCol(col));
    updateFlag = false;
  }
}

export function renderCol(col: ColData) {
  const rect = state.viewRect;
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

export function renderRow(row: RowData) {
  const rect = state.viewRect;

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
  updateFlag = true;
}

export function pushRows(rows: RowData[]) {
  rows.forEach((row) => pushRow(row));
}

export function pushCol(col: ColData) {
  colQueue.add(col);
  updateFlag = true;
}

export function pushCols(cols: ColData[]) {
  cols.forEach((col) => pushCol(col));
}
