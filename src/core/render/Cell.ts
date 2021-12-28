import { CellData, getCellRect } from "../store";
import { fillText } from "../utils/draw";
import { clearRect } from "./Renderer";

let updateFlag = false;

const cellQueue: Set<{
  rowIdx: number;
  colIdx: number;
  cell: CellData;
}> = new Set();

export function pushCell(cell: CellData, colIdx: number, rowIdx: number) {
  cellQueue.add({
    cell,
    colIdx,
    rowIdx,
  });
  updateFlag = true;
}

export function renderCells(ctx: CanvasRenderingContext2D) {
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