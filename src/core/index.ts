import { initData } from "./data/init";
import { run } from "./render/Renderer";
import { getCellRect, getCurrentSheet, state } from "./store";
import { loadTools } from "./store/tools";
import { attr } from "./utils/dom";

export function init(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  ctx && run(ctx);
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
