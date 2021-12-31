import { createStore } from "solid-js/store";
import { Coord } from ".";

const app = {
  cellEditor: {
    show: false,
    value: "",
    coord: [-1, -1] as Coord,
    rect: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  },
};

export const [appState, setAppState] = createStore(app);
