import { Coord } from ".";

export type Ranger = [Coord, Coord];

export function getRangerRect(ranger: Ranger) {
  return {
    x: ranger[0][0],
    y: ranger[0][1],
    width: ranger[1][0] - ranger[0][0] + 1,
    height: ranger[1][1] - ranger[0][1] + 1,
  };
}
