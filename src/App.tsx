import { Component, createSignal, onMount } from "solid-js";
import styles from "./App.module.less";
import { config, init } from "./core";
import Editor from "./components/Editor/Index";
import { Rect } from "./core/utils/draw";
import { getCell, getCellRect, setViewRect } from "./core/store";
import Toolbar from "./core/view/toolbar";
import { onDbClick, onClick, onMousedown, onMouseup } from "./core/events";
import "./core/operator";
import { appState } from "./core/store/app";
import { getSheetCanvas } from "./core/render/Sheet";
import { getCellCanvas } from "./core/render/Cell";
import { attr } from "./core/utils/dom";

config({
  tools: [["backgroundColor"]],
});

let $canvas: any = null;
let $container: any = null;

export function getCanvas() {
  return $canvas as HTMLCanvasElement;
}

const App: Component = () => {
  onMount(() => {
    init($canvas);
    resize();
  });
  return (
    <div class={styles.mainContainer}>
      <Toolbar></Toolbar>
      <div
        onDblClick={onDbClick}
        onClick={onClick}
        onMouseDown={onMousedown}
        onMouseUp={onMouseup}
        class={styles.excelContainer}
        ref={$container}
      >
        <canvas className="canvas" ref={$canvas as HTMLCanvasElement}></canvas>
      </div>
      {appState.cellEditor.show ? <Editor /> : null}
    </div>
  );
};

export function getContainerBounding() {
  return $container.getBoundingClientRect();
}

function resize() {
  const { width, height } = getContainerBounding();
  attr(getCanvas(), "width", width + "");
  attr(getCanvas(), "height", height + "");
  attr(getCanvas(), 'style', `width:${width}px;height:${height}px;`);
  attr(getSheetCanvas(), "width", width + "");
  attr(getSheetCanvas(), "height", height + "");
  attr(getSheetCanvas(), 'style', `width:${width}px;height:${height}px;`);
  attr(getCellCanvas(), "width", width + "");
  attr(getCellCanvas(), "height", height + "");
  attr(getCellCanvas(), 'style', `width:${width}px;height:${height}px;`);
  setViewRect({ width, height });
}

export default App;
