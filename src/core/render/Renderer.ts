import { style } from "../conf/default";
import {
  CellData,
  dataInView,
  getCellRect,
  getCurrentSheet,
  getViewRect,
  state,
  translateNumberToColIdx,
} from "../store";
import { getRangerViewRect, Ranger } from "../store/ranger";
import { fillRect, fillText, line, Rect, strokeRect } from "../utils/draw";
import {
  render as renderCells,
  getCellCanvas,
  emptyQueue as emptyCellQueue,
} from "./Cell";
import {
  getSheetCanvas,
  render as renderSheet,
  emptyQueue as emptySheetQueue,
  pushRows,
  pushCols,
} from "./Sheet";

const cbs: (() => undefined)[] = [];

let timer: number;
let rect: Rect;
let updateFlag = false;
let all = false;

export function run(ctx: CanvasRenderingContext2D) {
  const { requestAnimationFrame } = window;
  const fn = () => {
    if (!updateFlag) {
      return;
    }
    if (all) {
      empty();
      const { rows, cols } = dataInView();
      pushRows(rows);
      pushCols(cols);
    }
    render(ctx);
    flushCallbacks();
    cbs.length = 0;
    updateFlag = false;
    all = false;
    requestAnimationFrame(fn);
  };
  timer = requestAnimationFrame(fn);
}

export function stop() {
  cancelAnimationFrame(timer);
}

function render(ctx: CanvasRenderingContext2D) {
  ctx.save();
  transform(ctx);
  diffRect();
  clean(ctx);
  renderCells();
  renderSheet();
  compose(ctx);
  renderSelector(ctx);
  ctx.restore();
}

function empty() {
  emptyCellQueue();
  emptySheetQueue();
}

function clean(ctx: CanvasRenderingContext2D) {
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

export function trigger(paintAll: boolean = false) {
  updateFlag = true;
  all = paintAll;
}

function flushCallbacks() {
  cbs.forEach((fn) => {
    fn();
  });
}

export function transform(ctx: CanvasRenderingContext2D) {
  const s = getCurrentSheet();
  const {
    viewRect: { x, y },
    scale
  } = s;
  ctx.scale(scale, scale);
  ctx.translate(-x, -y);
}
