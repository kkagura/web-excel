/**
 *   0 1
 *   3 2
 */

import { getRangerRect, Ranger } from "../store/ranger";
import { Rect } from "../utils/draw";
import { intersect } from "../utils/utils";

export default class QTree {
  maxLength = 10;
  nodes: QTree[] = [];
  objects: Ranger[] = [];
  constructor(public rect: Rect, public level: number = 0) {}
  get splitable() {
    return this.rect.height >= 2 && this.rect.width >= 2;
  }
  split() {
    if (!this.splitable) {
      return;
    }
    const { x, y, width, height } = this.rect;
    const leftw = Math.floor(width / 2);
    const rightw = width - leftw;
    const toph = Math.floor(height / 2);
    const bottomh = height - toph;
    const level = this.level + 1;
    this.nodes[0] = new QTree(
      {
        x,
        y,
        width: leftw,
        height: toph,
      },
      level
    );
    this.nodes[1] = new QTree(
      {
        x: x + leftw,
        y,
        width: rightw,
        height: toph,
      },
      level
    );
    this.nodes[2] = new QTree(
      {
        x: x + leftw,
        y: y + toph,
        width: rightw,
        height: bottomh,
      },
      level
    );
    this.nodes[3] = new QTree(
      {
        x,
        y: y + toph,
        width: leftw,
        height: bottomh,
      },
      level
    );
  }
  getIndexs(ranger: Ranger) {
    const rangeRect = getRangerRect(ranger);
    const res = [];
    for (let i = 0; i < this.nodes.length; i++) {
      const { rect } = this.nodes[i];
      if (intersect(rect, rangeRect)) {
        res.push(i);
      }
    }
    return res;
  }
  insert(ranger: Ranger) {
    if (this.nodes.length) {
      const indexs = this.getIndexs(ranger);
      indexs.forEach((i) => {
        this.nodes[i].insert(ranger);
      });
      return;
    }
    this.objects.push(ranger);
    if (
      !this.nodes.length &&
      this.objects.length > this.maxLength &&
      this.splitable
    ) {
      this.split();
      for (let i = 0; i < this.objects.length; i++) {
        const ranger = this.objects[i];
        const indexs = this.getIndexs(ranger);
        indexs.forEach((i) => {
          this.nodes[i].insert(ranger);
        });
      }
      this.objects = [];
    }
  }
  intersect(rect: Rect) {
    const res = new Set<Ranger>();
    this.objects.forEach((ranger) => {
      const rangeRect = getRangerRect(ranger);
      if (intersect(rect, rangeRect)) {
        res.add(ranger);
      }
    });
    this.nodes.forEach((node) => {
      const nodeRes = node.intersect(rect);
      nodeRes.forEach((ranger) => res.add(ranger));
    });
    return [...res];
  }
}
