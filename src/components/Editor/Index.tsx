import { Component, createSignal, onMount } from "solid-js";
import { getContainerBounding } from "../../App";
import { CellCoordinate, updateCellValue } from "../../core/store";
import { appState, setAppState } from "../../core/store/app";
import { Rect } from "../../core/utils/draw";
import styles from "./index.module.less";

function onBlur(e: FocusEvent, coord: CellCoordinate) {
  const value = (e.target as HTMLElement).innerText;
  updateCellValue(coord, value);
}

const Editor: Component = () => {
  let $editor: any = null;
  // const { editorPosition, editorValue, updated, coord } = props;
  const { rect, coord, value } = appState.cellEditor;
  const { top, left } = getContainerBounding();
  const style = {
    left: (rect.x || 0) + left + "px",
    top: (rect.y || 0) + top + "px",
    width: (rect.width || 50) + "px",
    height: (rect.height || 50) + "px",
  };
  onMount(() => {
    console.log("editor mounted");
    $editor.focus();
  });
  return (
    <div class={styles.editorWrap} style={style}>
      <div
        onBlur={(e) => {
          onBlur(e, coord);
          setAppState("cellEditor", () => ({ show: false }));
        }}
        class={styles.editor}
        ref={$editor as HTMLInputElement}
        contentEditable
      >
        {value}
      </div>
    </div>
  );
};

export default Editor;
