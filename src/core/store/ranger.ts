import { Coord, getCellRect, isSameCoord } from ".";
import { Rect } from "../utils/draw";

export type Ranger = [Coord, Coord];

export function getRangerRect(ranger: Ranger) {
  return {
    x: ranger[0][0],
    y: ranger[0][1],
    width: ranger[1][0] - ranger[0][0] + 1,
    height: ranger[1][1] - ranger[0][1] + 1,
  };
}

export function getRangerViewRect(ranger: Ranger): Rect {
  const start = getCellRect(ranger[0]);
  const end = getCellRect(ranger[1]);
  return {
    x: start.x,
    y: start.y,
    width: end.x - start.x + end.width,
    height: end.y - start.y + end.height,
  };
}

export function isSameRanger(range1: Ranger, range2: Ranger) {
  return isSameCoord(range1[0], range2[0]) && isSameCoord(range1[1], range2[1]);
}
