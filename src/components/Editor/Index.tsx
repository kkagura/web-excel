import { Component, createSignal } from "solid-js";
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
  const { editorPosition, editorValue, updated, coord } = props;
  const style = {
    left: (editorPosition.x || 0) + "px",
    top: (editorPosition.y || 0) + "px",
    width: (editorPosition.width || 50) + "px",
    height: (editorPosition.height || 50) + "px",
  };
  return (
    <div
      onBlur={(e) => {
        onBlur(e, coord);
        updated();
      }}
      style={style}
      contentEditable
      class={styles.editorWrap}
    >
      {editorValue}
    </div>
  );
};

export default Editor;
