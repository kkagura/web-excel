import { CellData, ColData, RowData } from "../store";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const cellQueue: Set<CellData> = new Set();
const rowQueue: Set<RowData> = new Set();
const colQueue: Set<ColData> = new Set();

let updateFlag = false;

export function run(ctx: CanvasRenderingContext2D) {
  const { requestAnimationFrame } = window;
  const fn = () => {
    render(ctx);
    requestAnimationFrame(fn);
  };
  requestAnimationFrame(fn);
}

export function pushCell(cell: CellData) {
  cellQueue.add(cell);
  updateFlag = true;
}

export function pushRow(row: RowData) {
  rowQueue.add(row);
  updateFlag = true;
}

export function pushCol(col: ColData) {
  colQueue.add(col);
  updateFlag = true;
}

function render(ctx: CanvasRenderingContext2D) {
  if (!updateFlag) {
    return;
  }
  renderCells(ctx);
  renderRows(ctx);
  renderCols(ctx);
}

function renderCells(ctx: CanvasRenderingContext2D) {}

function renderRows(ctx: CanvasRenderingContext2D) {}

function renderCols(ctx: CanvasRenderingContext2D) {}
