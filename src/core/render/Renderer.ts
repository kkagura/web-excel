import { style } from "../conf/default";
import {
  CellData,
  getCellRect,
  state,
  translateNumberToColIdx,
} from "../store";
import { fillRect, fillText, line, Rect } from "../utils/draw";
import { getSheetCanvas, renderGrid } from "./Sheet";

const cbs: (() => undefined)[] = [];

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

function render(ctx: CanvasRenderingContext2D) {
  diffRect();
  // clearRect(ctx, rect);
  renderGrid();
  compose(ctx);
  flushCallbacks();
  cbs.length = 0;
}

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
