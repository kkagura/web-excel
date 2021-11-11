import event from "./conf/event";
import { EventEmitter } from "./data/EventEmitter";
import { Sheet } from "./data/Sheet";
import { Rect } from "./render/Renderer";
import { attr } from "./utils/dom";

interface Options {
  el: HTMLElement;
  tools?: any[];
  plugins?: any[];
  useWorker?: false;
}

export default class WebExcel extends EventEmitter {
  sheets: Map<string, Sheet> = new Map();
  currentSheet?: Sheet;
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
    this.bindEvents();
    this.init();
  }

  bindEvents() {
    this.on(event.RENDER, this.render);
  }

  init() {
    this.createEmptySheet();
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
    this.viewRect.width = width;
    this.viewRect.height = height;
    this.emit(event.RENDER, true);
  }

  createEmptySheet() {
    const sheet = new Sheet();
    sheet.initData();
    this.sheets.set(sheet.name, sheet);
    if (!this.currentSheet) {
      this.setCurrentSheet(sheet.name);
    }
  }

  setCurrentSheet(name: string) {
    if (this.currentSheet?.name === name) {
      return;
    }
    const sheet = this.sheets.get(name);
    if (!sheet) {
      return;
    }
    this.currentSheet = sheet;
    this.emit(event.RENDER, true);
  }

  render(repaintAll: boolean) {
    // const sheet = this.currentSheet;
    // if (!sheet) {
    //   return;
    // }
    // const ctx = this.$canvas.getContext("2d");
    // if (repaintAll) {
    //   const { cols, rows } = sheet;
    //   renderAll(ctx as CanvasRenderingContext2D, this.viewRect, cols, rows);
    // }
  }
}
