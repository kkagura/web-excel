import { getCanvas } from "../../App";
import { addEventListener, getCellCoordAt } from "../events";
import { getCell, getCellRect, setSelector } from "../store";
import { setAppState } from "../store/app";
import { Ranger } from "../store/ranger";

addEventListener("dbClick", (e) => {
  // const {
  //   row: { i: rowIdx },
  //   col: { i: colIdx },
  // } = e;
  const coord = e.getCellCoordAt();
  if (!coord) {
    return;
  }
  const rect = getCellRect(coord);
  const cell = getCell(coord);
  setAppState("cellEditor", () => {
    return {
      show: true,
      coord: coord,
      rect,
      value: cell.value,
    };
  });
});

addEventListener("mousedown", (e) => {
  const coord = e.getCellCoordAt();
  if (!coord) {
    return;
  }
  const selector: Ranger = [
    [...coord],
    [...coord],
  ];
  setSelector(selector);
  const canvas = getCanvas();
  console.log(canvas);
  const movemove = (e: MouseEvent) => {
    const coord = getCellCoordAt(e);
    if (coord) {
      setSelector([selector[0], coord]);
    }
  };
  const mouveup = () => {
    console.log('up')
    canvas.removeEventListener("mousemove", movemove);
    canvas.removeEventListener("mouseup", mouveup);
    canvas.removeEventListener("mouseleave", mouveup);
  };
  canvas.addEventListener("mousemove", movemove);
  canvas.addEventListener("mouseup", mouveup);
  canvas.addEventListener("mouseleave", mouveup);
});
