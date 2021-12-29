import { getCanvas } from "../../App";
import { CellData, ColData, getCell, getCurrentSheet, RowData } from "../store";
import { binarySearch } from "../utils/utils";

export type CMouseEvent = {
  raw: MouseEvent;
  row: RowData;
  col: ColData;
  cell: CellData;
};

type EventType = "click" | "mousedown" | "mouseup" | "dbClick";

type Hanlder = (e: CMouseEvent) => void;

type BaseMap = Map<EventType, Hanlder[]>;

const rowMap: BaseMap = new Map();
const colMap: BaseMap = new Map();
const cellMap: BaseMap = new Map();

export function addRowEventListener(type: EventType, handler: Hanlder) {
  addEventListener(type, handler, rowMap);
}

export function addColEventListener(type: EventType, handler: Hanlder) {
  addEventListener(type, handler, colMap);
}

export function addCellEventListener(type: EventType, handler: Hanlder) {
  addEventListener(type, handler, cellMap);
}

export function removeRowEventListener(type: EventType, handler?: Hanlder) {
  removeEventListener(type, rowMap, handler);
}

export function removeColEventListener(type: EventType, handler?: Hanlder) {
  removeEventListener(type, colMap, handler);
}

export function removeCellEventListener(type: EventType, handler?: Hanlder) {
  removeEventListener(type, cellMap, handler);
}

function addEventListener(type: EventType, handler: Hanlder, map: BaseMap) {
  if (!map.has(type)) {
    map.set(type, [handler]);
    return;
  }
  map.get(type)?.push(handler);
}

function removeEventListener(
  type: EventType,
  map: BaseMap,
  handler: Hanlder | undefined
) {
  if (!map.has(type)) {
    return;
  }
  if (!handler) {
    map.delete(type);
  }
  const listeners = map.get(type);
  if (!listeners) {
    return;
  }
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i];
    if (handler === listener) {
      listeners.splice(i, 1);
      break;
    }
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
  const canvas = getCanvas();
  const { left, top } = canvas.getBoundingClientRect();
  const offsetx = e.pageX - left;
  const offsety = e.pageY - top;
  const sheet = getCurrentSheet();
  const rowData = binarySearch(sheet.rows, (row) => {
    if (row.top >= offsety) {
      return -1;
    }
    if (row.top + row.height < offsety) {
      return 1;
    }
    return 0;
  });
  if (!rowData) {
    return;
  }
  const colData = binarySearch(sheet.cols, (col) => {
    if (col.left >= offsetx) {
      return -1;
    }
    if (col.left + col.width < offsetx) {
      return 1;
    }
    return 0;
  });
  if (!colData) {
    return;
  }
  const cell = getCell([rowData.i, colData.i]);
  const event = {
    cell,
    row: rowData,
    col: colData,
    raw: e,
    stop: false,
  };
  cellMap.get(type)?.forEach((listener) => {
    listener(event);
  });
  rowMap.get(type)?.forEach((listener) => {
    listener(event);
  });
  colMap.get(type)?.forEach((listener) => {
    listener(event);
  });
}
