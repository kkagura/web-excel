import { style } from "../conf/default";
import {
  CellData,
  getCellRect,
  getCurrentSheet,
  state,
  translateNumberToColIdx,
} from "../store";
import { Ranger } from "../store/ranger";
import { fillRect, fillText, line, Rect } from "../utils/draw";
import { render as renderCells, getCellCanvas } from "./Cell";
import { getSheetCanvas, render as renderSheet } from "./Sheet";

const cbs: (() => undefined)[] = [];

let timer: number;
let rect: Rect;
let updateFlag = false;
let oldSelector: Ranger;

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
  renderSheet();
  renderCells();
  compose(ctx);
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
  rect = { ...state.viewRect };
}

function compose(ctx: CanvasRenderingContext2D) {
  const sheetCanvas = getSheetCanvas();
  ctx.drawImage(
    sheetCanvas,
    state.viewRect.x,
    state.viewRect.y,
    state.viewRect.width,
    state.viewRect.height
  );
  const cellCanvas = getCellCanvas();
  ctx.drawImage(
    cellCanvas,
    state.viewRect.x,
    state.viewRect.y,
    state.viewRect.width,
    state.viewRect.height
  );
}

function renderSelector(ctx: CanvasRenderingContext2D) {
  const s = getCurrentSheet();
  if (!s.selector) {
    return;
  }
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
