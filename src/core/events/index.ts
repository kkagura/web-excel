import { getCanvas } from "../../App";
import { style } from "../conf/default";
import {
  CellData,
  ColData,
  Coord,
  getCell,
  getCurrentSheet,
  RowData,
} from "../store";
import { binarySearch } from "../utils/utils";

export type CMouseEvent = {
  raw: MouseEvent;
  row: RowData;
  col: ColData;
  cell: CellData;
};

export class CEvent {
  constructor(public raw: MouseEvent) {}
  getCellCoordAt() {
    return getCellCoordAt(this.raw);
  }
}

type EventType = "click" | "mousedown" | "mouseup" | "dbClick";

type Hanlder = (e: CEvent) => void;

type BaseMap = Map<EventType, Hanlder[]>;

const eventMap: BaseMap = new Map();

// const rowMap: BaseMap = new Map();
// const colMap: BaseMap = new Map();
// const cellMap: BaseMap = new Map();

// export function addRowEventListener(type: EventType, handler: Hanlder) {
//   addEventListener(type, handler, rowMap);
// }

// export function addColEventListener(type: EventType, handler: Hanlder) {
//   addEventListener(type, handler, colMap);
// }

// export function addCellEventListener(type: EventType, handler: Hanlder) {
//   addEventListener(type, handler, cellMap);
// }

// export function removeRowEventListener(type: EventType, handler?: Hanlder) {
//   removeEventListener(type, rowMap, handler);
// }

// export function removeColEventListener(type: EventType, handler?: Hanlder) {
//   removeEventListener(type, colMap, handler);
// }

// export function removeCellEventListener(type: EventType, handler?: Hanlder) {
//   removeEventListener(type, cellMap, handler);
// }

// function addEventListener(type: EventType, handler: Hanlder, map: BaseMap) {
//   if (!map.has(type)) {
//     map.set(type, [handler]);
//     return;
//   }
//   map.get(type)?.push(handler);
// }

// function removeEventListener(
//   type: EventType,
//   map: BaseMap,
//   handler: Hanlder | undefined
// ) {
//   if (!map.has(type)) {
//     return;
//   }
//   if (!handler) {
//     map.delete(type);
//   }
//   const listeners = map.get(type);
//   if (!listeners) {
//     return;
//   }
//   for (let i = 0; i < listeners.length; i++) {
//     const listener = listeners[i];
//     if (handler === listener) {
//       listeners.splice(i, 1);
//       break;
//     }
//   }
// }

export function addEventListener(type: EventType, handler: Hanlder) {
  const handlers = eventMap.get(type);
  if (handlers) {
    handlers.push(handler);
  } else {
    eventMap.set(type, [handler]);
  }
}

export function removeEventListener(type: EventType, handler?: Hanlder) {
  if (handler) {
    const handlers = eventMap.get(type);
    if (handlers) {
      const i = handlers.indexOf(handler);
      if (i > -1) {
        handlers.splice(i, 1);
        if (handlers.length <= 0) {
          eventMap.delete(type);
        }
      }
    }
  } else {
    eventMap.delete(type);
  }
}

export function onMousedown(e: MouseEvent) {
  handleMouseEvent("mousedown", e);
}

export function onMouseup(e: MouseEvent) {
  handleMouseEvent("mouseup", e);
}

export function onClick(e: MouseEvent) {
  handleMouseEvent("click", e);
}

export function onDbClick(e: MouseEvent) {
  handleMouseEvent("dbClick", e);
}

function handleMouseEvent(type: EventType, e: MouseEvent) {
  const handlers = eventMap.get(type);
  if (handlers) {
    const event = new CEvent(e);
    handlers.forEach((cb) => cb(event));
  }
}

export function getCellCoordAt(e: MouseEvent): Coord | null {
  const canvas = getCanvas();
  const { left, top } = canvas.getBoundingClientRect();
  const sheet = getCurrentSheet();
  const {
    viewRect: { x, y },
    scale,
  } = sheet;
  const { width, height } = style.header;
  const offsetx = e.pageX - left - width * scale + x;
  const offsety = e.pageY - top - height * scale + y;
  const rowData = binarySearch(sheet.rows, (row) => {
    const { top, height } = row;
    if (top * scale >= offsety) {
      return -1;
    }
    if ((top + height) * scale < offsety) {
      return 1;
    }
    return 0;
  });
  if (!rowData) {
    return null;
  }
  const colData = binarySearch(sheet.cols, (col) => {
    const { left, width } = col;
    if (left * scale >= offsetx) {
      return -1;
    }
    if ((left + width) * scale < offsetx) {
      return 1;
    }
    return 0;
  });
  if (!colData) {
    return null;
  }
  console.log(rowData.i, colData.i);
  return [rowData.i, colData.i];
}
