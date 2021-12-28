import { createStore } from "solid-js/store";

const app = {
  cellEditor: {
    show: false,
    value: "",
    coord: { colIdx: -1, rowIdx: -1 },
    rect: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  },
};

export const [appState, setAppState] = createStore(app);
