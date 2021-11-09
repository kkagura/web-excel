import { style } from "../conf/default";
import { Cell } from "../data/Cell";
import { Column } from "../data/Column";
import { Row } from "../data/Row";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function renderCells(ctx: CanvasRenderingContext2D, cells: Set<Cell>) {}

export function renderAll(
  ctx: CanvasRenderingContext2D,
  viewRect: Rect,
  cols: Map<string, Column>,
  rows: Map<string, Row>
) {
  clear(ctx, viewRect);
  const { x, y, width, height } = viewRect;
  const { borderWidth, borderColor } = style;
  let startX = x,
    startY = y;
  rows.forEach((row, key) => {
    const rowHeight = row.height;
    startY += rowHeight;
    if (startY > y + height) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x, startY - 0.5);
    ctx.lineTo(x + width, startY - 0.5);
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
  });
  cols.forEach((col, key) => {
    const colWidth = col.width;
    startX += colWidth;
    if (startX > x + width) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(startX - 0.5, y);
    ctx.lineTo(startX - 0.5, y + height);
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
  });
}

export function renderPan(ctx: CanvasRenderingContext2D, panRect: Rect) {}

function clear(ctx: CanvasRenderingContext2D, rect: Rect) {
  ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
}
