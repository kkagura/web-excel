import { Component, createSignal, onMount } from "solid-js";
import { CellCoordinate, updateCellValue } from "../../core/store";
import { Rect } from "../../core/utils/draw";
import styles from "./index.module.less";

function onBlur(e: FocusEvent, coord: CellCoordinate) {
  const value = (e.target as HTMLElement).innerText;
  updateCellValue(coord, value);
}

interface Props {
  editorPosition: Rect;
  editorValue: string;
  updated: () => void;
  coord: CellCoordinate;
}

const Editor: Component<Props> = (props) => {
  let $editor: any = null;
  const { editorPosition, editorValue, updated, coord } = props;
  const style = {
    left: (editorPosition.x || 0) + "px",
    top: (editorPosition.y || 0) + "px",
    width: (editorPosition.width || 50) + "px",
    height: (editorPosition.height || 50) + "px",
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
          updated();
        }}
        class={styles.editor}
        ref={$editor as HTMLInputElement}
        contentEditable
      >
        {editorValue}
      </div>
    </div>
  );
};

export default Editor;
