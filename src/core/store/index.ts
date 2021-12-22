import { style } from "../conf/default";
import { pushCell, pushCols, pushRows } from "../render/Renderer";
import { Rect } from "../utils/draw";
import { createCacheFn, toNumber, getCellValue } from "../utils/utils";

export const COL_START = "A".charCodeAt(0);
export const COL_END = "Z".charCodeAt(0);

export interface CellCoordinate {
  colIdx: number;
  rowIdx: number;
}

interface BorderStyle {
  top?: Border;
  left?: Border;
  right?: Border;
  bottom?: Border;
}

interface Border {
  width?: number;
  type?: "solid" | "dashed";
  color?: "";
}

export interface CellData {
  value: string;
  raw: any;
  style?: {
    border?: BorderStyle;
  };
  hl?: "l" | "m" | "r"; //  水平对齐
  vl?: "t" | "m" | "b"; //  垂直对齐
}

export interface ColData {
  i: number;
  left: number;
  width: number;
  fixed: boolean;
}

export interface RowData {
  i: number;
  top: number;
  height: number;
  fixed: boolean;
}

export interface Sheet {
  name: string;
  cells: CellData[][];
  cols: ColData[];
  rows: RowData[];
  rowCount: number;
  colCount: number;
}

interface State {
  name: string;
  currIdx: number;
  sheets: Sheet[];
  selected?: [[string, string], [string, string]];
  viewRect: Rect;
}

export const state: State = {
  name: "Table",
  currIdx: 0,
  sheets: [
    {
      name: "Sheet1",
      cells: [],
      cols: [],
      rows: [],
      rowCount: 0,
      colCount: 0,
    },
  ],
  viewRect: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
};

export function getCurrentSheet() {
  const { sheets, currIdx } = state;
  return sheets[currIdx];
}

export function getCellsByRowIdx(i: number) {
  const sheet = getCurrentSheet();
  const { cells } = sheet;
  return cells[i];
}

export function getCellsByColIdx(i: number) {}

export const translateColIdxToNumber = createCacheFn<string, number>((k) => {
  let res = 0;
  for (let i = 0; i < k.length; i++) {
    const charIndex = k.charCodeAt(i) - COL_START;
    res += charIndex;
  }
  return res;
});

export const translateNumberToColIdx = createCacheFn<number, string>((i) => {
  i += COL_START;
  return String.fromCharCode(i);
});

export function addRow(i: number, withCell: boolean = true) {
  const sheet = getCurrentSheet();
  sheet.rowCount++;
  const row = createRow(i);
  sheet.rows.splice(i, 0, row);
  row.top = accumHeight(sheet.rows.slice(0, i));
  if (withCell) {
    const cells = new Array(sheet.colCount).fill(null).map(() => createCell(i));
    sheet.cells.splice(i, 0, cells);
  }
  const updateRows = sheet.rows.slice(i);
  updateRows.forEach((updateRow, i) => {
    if (i === 0) {
      return;
    }
    updateRow.top += row.height;
  });
  pushRows(updateRows);
}

export function addCol(i: number, withCell: boolean = false) {
  const sheet = getCurrentSheet();
  sheet.colCount++;
  const col = createCol(i);
  sheet.cols.splice(i, 0, col);
  col.left = accumWidth(sheet.cols.slice(0, i));
  if (withCell) {
    const { rowCount, cells } = sheet;
    for (let i = 0; i < rowCount; i++) {
      const rows = cells[i];
      rows.splice(i, 0, createCell(""));
    }
  }
  const updateCols = sheet.cols.slice(i);
  updateCols.forEach((updateCol, i) => {
    if (i === 0) {
      return;
    }
    updateCol.left += col.width;
  });
  pushCols(updateCols);
}

function createCell(raw: any): CellData {
  return {
    value: getCellValue(raw),
    raw,
  };
}

function createRow(i: number, top: number = 0): RowData {
  return {
    i,
    top,
    height: 100,
    fixed: false,
  };
}

function createCol(i: number, left: number = 0): ColData {
  return {
    i,
    left,
    width: 100,
    fixed: false,
  };
}

function accumHeight(rows: RowData[]) {
  const h = rows.reduce((total, row) => {
    return total + row.height;
  }, style.header.height);
  return h;
}

function accumWidth(cols: ColData[]) {
  const w = cols.reduce((total, col) => {
    return total + col.width;
  }, style.header.width);
  return w;
}

function getRow(rowIndex: number) {
  const s = getCurrentSheet();
  const { rows } = s;
  return rows[rowIndex];
}

function getCol(colIndex: number) {
  const s = getCurrentSheet();
  const { cols } = s;
  return cols[colIndex];
}

export function getCellRect(coord: CellCoordinate): Rect {
  const { colIdx, rowIdx } = coord;
  const row = getRow(rowIdx);
  const col = getCol(colIdx);
  return {
    x: col.left,
    y: row.top,
    width: col.width,
    height: row.height,
  };
}

export function getCell(coord: CellCoordinate) {
  const { colIdx, rowIdx } = coord;
  return getCurrentSheet().cells[rowIdx][colIdx];
}

export function updateCellValue(coord: CellCoordinate, value: string) {
  const cell = getCell(coord);
  cell.value = value;
  pushCell(cell, coord.colIdx, coord.rowIdx);
}
