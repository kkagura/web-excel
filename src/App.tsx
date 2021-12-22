import { Component, createSignal, onMount } from "solid-js";
import styles from "./App.module.less";
import { getCellIndexAt, init } from "./core";
import Editor from "./components/Editor/Index";
import { Rect } from "./core/utils/draw";
import { getCell, getCellRect } from "./core/store";

const [editorPosition, setEditorPosition] = createSignal<Rect>({
  x: 0,
  y: 0,
  width: 50,
  height: 50,
});

const [editorValue, setEditorValue] = createSignal<string>("zsda");

const [showEditor, setShowEditor] = createSignal(false);

const [coord, setCoord] = createSignal({ colIdx: -1, rowIdx: -1 });

const App: Component = () => {
  let $canvas: any = null;
  onMount(() => {
    init($canvas);
  });
  return (
    <div class={styles.mainContainer}>
      <div onDblClick={onDbClick} class={styles.excelContainer}>
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

function onDbClick(e: MouseEvent) {
  console.log("dbClick");
  const res = getCellIndexAt({
    x: e.pageX,
    y: e.pageY,
  });
  if (!res) {
    return;
  }
  const { colIdx, rowIdx } = res;
  setCoord(res);
  setEditorPosition(getCellRect({ colIdx, rowIdx }));
  const cell = getCell({ colIdx, rowIdx });
  setEditorValue(cell.value);
  setShowEditor(true);
}

function updated() {
  setShowEditor(false);
}

export default App;
