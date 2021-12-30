import { getCanvas } from "../../App";
import { addCellEventListener, getCellCoordAt } from "../events";
import { getCellRect, setSelector } from "../store";
import { setAppState } from "../store/app";
import { Ranger } from "../store/ranger";

addCellEventListener("dbClick", (e) => {
  const {
    row: { i: rowIdx },
    col: { i: colIdx },
  } = e;
  const rect = getCellRect([rowIdx, colIdx]);
  setAppState("cellEditor", () => {
    return {
      show: true,
      coord: { rowIdx, colIdx },
      rect,
      value: e.cell.value,
    };
  });
});

addCellEventListener("mousedown", (e) => {
  const {
    row: { i: rowIdx },
    col: { i: colIdx },
  } = e;
  const selector: Ranger = [
    [rowIdx, colIdx],
    [rowIdx, colIdx],
  ];
  setSelector(selector);
  const canvas = getCanvas();
  const movemove = (e: MouseEvent) => {
    const coord = getCellCoordAt(e);
    if (coord) {
      setSelector([selector[0], coord]);
    }
  };
  const mouveup = () => {
    canvas.removeEventListener("mousemove", movemove);
    canvas.removeEventListener("mouseup", mouveup);
    canvas.removeEventListener("mouseleave", mouveup);
  };
  canvas.addEventListener("mousemove", movemove);
  canvas.addEventListener("mouseup", mouveup);
  canvas.addEventListener("mouseleave", mouveup);
});
