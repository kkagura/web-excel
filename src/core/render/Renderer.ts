import { style } from "../conf/default";
import {
  CellData,
  getCellRect,
  getCurrentSheet,
  getViewRect,
  state,
  translateNumberToColIdx,
} from "../store";
import { getRangerViewRect, Ranger } from "../store/ranger";
import { fillRect, fillText, line, Rect, strokeRect } from "../utils/draw";
import { render as renderCells, getCellCanvas } from "./Cell";
import { getSheetCanvas, render as renderSheet } from "./Sheet";

const cbs: (() => undefined)[] = [];

let timer: number;
let rect: Rect;
let updateFlag = false;

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

function render(ctx: CanvasRenderingContext2D) {
  if (!updateFlag) {
    return;
  }
  diffRect();
  clear(ctx);
  renderCells();
  renderSheet();
  compose(ctx);
  renderSelector(ctx);
  flushCallbacks();
  cbs.length = 0;
  updateFlag = false;
}

function clear(ctx: CanvasRenderingContext2D) {
  clearRect(ctx, rect);
  clearSelector();
}

function clearSelector() {}

function diffRect() {
  rect = { ...getViewRect() };
}

function compose(ctx: CanvasRenderingContext2D) {
  const sheetCanvas = getSheetCanvas();
  ctx.drawImage(sheetCanvas, rect.x, rect.y, rect.width, rect.height);
  const cellCanvas = getCellCanvas();
  ctx.drawImage(cellCanvas, rect.x, rect.y, rect.width, rect.height);
}

function renderSelector(ctx: CanvasRenderingContext2D) {
  const s = getCurrentSheet();
  if (!s.selector) {
    return;
  }
  const rect = getRangerViewRect(s.selector);
  ctx.beginPath();
  ctx.strokeStyle = style.selector.borderColor;
  ctx.lineWidth = style.selector.borderWidth;
  strokeRect(ctx, rect);
}

export function clearRect(ctx: CanvasRenderingContext2D, rect: Rect) {
  const { x, y, width, height } = rect;
  ctx.clearRect(x, y, width, height);
}

export function nextTick(cb: () => undefined) {
  cbs.push(cb);
}

export function trigger() {
  updateFlag = true;
}

function flushCallbacks() {
  cbs.forEach((fn) => {
    fn();
  });
}
