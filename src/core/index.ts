import { EventEmitter } from "./data/EventEmitter";
import { Sheet } from "./data/Sheet";
import { Rect } from "./render/Render";
import { attr } from "./utils/dom";

interface Options {
  el: HTMLElement;
  tools?: any[];
  plugins?: any[];
  useWorker?: false;
}

export default class WebExcel extends EventEmitter {
  sheets: Sheet[] = [];
  currentSheet?: Sheet = undefined;
  updateQueue: Set<string> = new Set();
  viewRect: Rect = {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };
  $container: HTMLElement;
  // $toolbar: HTMLElement = document.createElement("div");
  // $formulaBar: HTMLElement = document.createElement("div");
  $canvas: HTMLCanvasElement = document.createElement("canvas");

  constructor(opts: Options) {
    super();
    this.$container = opts.el;
  }

  init() {
    this.adjustBounds();
    this.$container.appendChild(this.$canvas);
  }

  adjustBounds() {
    const { width, height } = this.$container.getBoundingClientRect();
    const canvas = this.$canvas;
    attr(canvas, "width", `${width}`);
    attr(canvas, "height", `${height}`);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  createEmptySheet() {
    const sheet = new Sheet();
    sheet.initData();
    this.sheets.push(sheet);
  }

  render(repaintAll: boolean) {
    if (repaintAll) {
    }
  }
}
