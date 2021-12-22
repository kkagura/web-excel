import { style } from "../conf/default";
import {
  CellData,
  ColData,
  getCellRect,
  getCellsByRowIdx,
  RowData,
  state,
  translateNumberToColIdx,
} from "../store";
import { fillRect, fillText, line, Rect } from "../utils/draw";

const cellQueue: Set<{
  rowIdx: number;
  colIdx: number;
  cell: CellData;
}> = new Set();
const rowQueue: Set<RowData> = new Set();
const colQueue: Set<ColData> = new Set();
const cbs: (() => undefined)[] = [];

let updateFlag = false;
let timer: number;
let rect: Rect;

export function run(ctx: CanvasRenderingContext2D) {
  const { requestAnimationFrame } = window;
  const fn = () => {
    render(ctx);
    requestAnimationFrame(fn);
  };
  timer = requestAnimationFrame(fn);
}

export function stop() {
  cancelAnimationFrame(timer);
}

export function pushCell(cell: CellData, colIdx: number, rowIdx: number) {
  cellQueue.add({
    cell,
    colIdx,
    rowIdx,
  });
  updateFlag = true;
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

function render(ctx: CanvasRenderingContext2D) {
  if (!updateFlag) {
    return;
  }
  diffRect();
  // clearRect(ctx, rect);
  renderRows(ctx);
  renderCols(ctx);
  renderCells(ctx);
  flushCallbacks();
  updateFlag = false;
  rowQueue.clear();
  colQueue.clear();
  cellQueue.clear();
  cbs.length = 0;
}

function renderCells(ctx: CanvasRenderingContext2D) {
  cellQueue.forEach((conf) => {
    ctx.save();
    const { cell, colIdx, rowIdx } = conf;
    const rect = getCellRect({ colIdx, rowIdx });
    clearRect(ctx, rect);
    const { value } = cell;
    fillText(ctx, value, {}, rect);
    ctx.restore();
  });
}

function renderRows(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = style.borderWidth;
  ctx.strokeStyle = style.borderColor;
  rowQueue.forEach((row) => {
    const startx = rect.x;
    //  绘制头部
    const headerRect = {
      x: startx,
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
  });
}

function renderCols(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = style.borderWidth;
  ctx.strokeStyle = style.borderColor;
  colQueue.forEach((col) => {
    const starty = rect.y;
    const headerRect = {
      x: col.left,
      y: starty,
      width: col.width,
      height: style.header.height,
    };
    ctx.fillStyle = style.header.backgroundColor;
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
  });
}

function diffRect() {
  rect = { ...state.viewRect };
}

export function clearRect(ctx: CanvasRenderingContext2D, rect: Rect) {
  const { x, y, width, height } = rect;
  ctx.clearRect(x, y, width, height);
}

export function nextTick(cb: () => undefined) {
  cbs.push(cb);
}

function flushCallbacks() {
  cbs.forEach((fn) => {
    fn();
  });
}
