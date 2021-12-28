import { addCellEventListener } from "../events";
import { getCellRect } from "../store";
import { setAppState } from "../store/app";

addCellEventListener("dbClick", (e) => {
  const {
    row: { i: rowIdx },
    col: { i: colIdx },
  } = e;
  const rect = getCellRect({ rowIdx, colIdx });
  setAppState("cellEditor", () => {
    return {
      show: true,
      coord: { rowIdx, colIdx },
      rect,
      value: e.cell.value,
    };
  });
});
