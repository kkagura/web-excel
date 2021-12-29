import { initData } from "./data/init";
import { run } from "./render/Renderer";
import { getCellRect, getCurrentSheet, state } from "./store";
import { loadTools } from "./store/tools";
import { attr } from "./utils/dom";

export function init(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  ctx && run(ctx);
  const { width, height } = (
    canvas.parentElement as HTMLElement
  ).getBoundingClientRect();
  attr(canvas, "width", width + "");
  attr(canvas, "height", height + "");
  state.viewRect.width = width;
  state.viewRect.height = height;
  initData();
}

interface Option {
  tools?: string[][];
}

export function config(option: Option) {
  if (option.tools?.length) {
    loadTools(option.tools);
  }
}
