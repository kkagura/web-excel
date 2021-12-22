export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FontStyle {
  fontFamily?: string;
  color?: string;
  textAlign?: CanvasTextAlign;
  baseLine?: CanvasTextBaseline;
  fontSize?: number;
}

export type Line = [Point, Point];

export function line(g: CanvasRenderingContext2D, line: Line) {
  const [start, end] = line;
  g.beginPath();
  g.moveTo(start.x, start.y);
  g.lineTo(end.x, end.y);
  g.stroke();
}

export function fillText(
  g: CanvasRenderingContext2D,
  text: string,
  fontStyle: FontStyle,
  rect: Rect
) {
  g.beginPath();
  const {
    fontFamily = "-apple-system",
    color = "#000",
    fontSize = 20,
    textAlign = "center",
    baseLine = "middle"
  } = fontStyle;
  g.font = `${fontSize}px ${fontFamily}`;
  g.fillStyle = color;
  g.textAlign = textAlign;
  g.textBaseline = baseLine
  g.fillText(text, rect.x + rect.width / 2, rect.y + rect.height / 2);
}

export function fillRect(g: CanvasRenderingContext2D, rect: Rect) {
  g.beginPath();
  g.fillRect(rect.x, rect.y, rect.width, rect.height);
}

export function strokeRect(g: CanvasRenderingContext2D, rect: Rect) {
  g.beginPath();
  g.strokeRect(rect.x, rect.y, rect.width, rect.height);
}
