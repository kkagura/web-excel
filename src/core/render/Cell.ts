import { getCanvas, getContainerBounding } from "../../App";
import { style } from "../conf/default";
import { CellData, getCellRect, getViewRect, state } from "../store";
import { fillRect, fillText } from "../utils/draw";
import { getRandomColor } from "../utils/utils";
import { clearRect, transform, trigger } from "./Renderer";

const cellQueue: Set<{
  rowIdx: number;
  colIdx: number;
  cell: CellData;
}> = new Set();

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

export function resize() {
  const { width, height } = getContainerBounding();
  canvas.width = width;
  canvas.height = height;
}

export function render() {
  clearRect(ctx, getViewRect());
  ctx.save();
  transform(ctx);
  const { x, y, width, height } = getViewRect();
  ctx.rect(x + style.header.width, y + style.header.height, width, height);
  ctx.clip();
  renderCells();
  ctx.restore();
}

export function pushCell(cell: CellData, rowIdx: number, colIdx: number) {
  cellQueue.add({
    cell,
    colIdx,
    rowIdx,
  });
  trigger();
}

function renderCells() {
  cellQueue.forEach((conf) => {
    ctx.save();
    const { cell, colIdx, rowIdx } = conf;
    const rect = getCellRect([rowIdx, colIdx]);
    clearRect(ctx, rect);
    // ctx.fillStyle = getRandomColor();
    // fillRect(ctx, rect);
    const { value } = cell;
    fillText(ctx, value, {}, rect);
    ctx.restore();
  });
}

export function getCellCanvas() {
  return canvas;
}

export function emptyQueue() {
  cellQueue.clear();
}
