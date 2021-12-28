import { Component, createSignal, onMount } from "solid-js";
import styles from "./App.module.less";
import { config, getCellIndexAt, init } from "./core";
import Editor from "./components/Editor/Index";
import { Rect } from "./core/utils/draw";
import { getCell, getCellRect } from "./core/store";
import Toolbar from "./core/view/toolbar";
import { onDbClick, onClick, onMousedown, onMouseup } from "./core/events";
import "./core/operator";

const [editorPosition, setEditorPosition] = createSignal<Rect>({
  x: 0,
  y: 0,
  width: 50,
  height: 50,
});

const [editorValue, setEditorValue] = createSignal<string>("zsda");

const [showEditor, setShowEditor] = createSignal(false);

const [coord, setCoord] = createSignal({ colIdx: -1, rowIdx: -1 });

config({
  tools: [["backgroundColor"]],
});

let $canvas: any = null;

export function getCanvas() {
  return $canvas as HTMLCanvasElement;
}

const App: Component = () => {
  onMount(() => {
    init($canvas);
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
      >
        <canvas className="canvas" ref={$canvas as HTMLCanvasElement}></canvas>
      </div>
      {showEditor() ? (
        <Editor
          editorValue={editorValue()}
          editorPosition={editorPosition()}
          updated={updated}
          coord={coord()}
        ></Editor>
      ) : null}
    </div>
  );
};

// function onDbClick(e: MouseEvent) {
//   const res = getCellIndexAt({
//     x: e.pageX,
//     y: e.pageY,
//   });
//   if (!res) {
//     return;
//   }
//   const { colIdx, rowIdx } = res;
//   setCoord(res);
//   setEditorPosition(getCellRect({ colIdx, rowIdx }));
//   const cell = getCell({ colIdx, rowIdx });
//   setEditorValue(cell.value);
//   setShowEditor(true);
// }

function updated() {
  setShowEditor(false);
}

export default App;
