import { getCanvas, getContainerBounding } from "../../App";
import { CellData, getCellRect, getViewRect, state } from "../store";
import { fillRect, fillText } from "../utils/draw";
import { getRandomColor } from "../utils/utils";
import { clearRect, trigger } from "./Renderer";

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
  renderCells();
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
    const { value } = cell;
    fillText(ctx, value, {}, rect);
    ctx.restore();
  });
}

export function getCellCanvas() {
  return canvas;
}
