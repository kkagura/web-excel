import { Cell } from "../data/Cell";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function renderCells(ctx: CanvasRenderingContext2D, cells: Set<Cell>) {}

export function renderAll(ctx: CanvasRenderingContext2D, viewRect: Rect) {}

export function renderPan(ctx: CanvasRenderingContext2D, panRect: Rect) {}
