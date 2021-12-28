import { JSXElement } from "solid-js";
import { createStore } from "solid-js/store";
import { state } from ".";

export interface Tool {
  name: string;
  icon: string;
  title: string;
  disabled: boolean;
  render?: () => JSXElement;
  callback: () => void;
}

const toolMap = new Map<string, Tool>([
  [
    "backgroundColor",
    {
      name: "backgroundColor",
      icon: "",
      title: "",
      disabled: false,
      callback() {},
    },
  ],
]);

export const [toolState, setToolState] = createStore([] as Tool[][]);

export function loadTools(tools: string[][]) {
  tools.forEach((toolGroup) => {
    const group = toolGroup
      .filter((name) => {
        return toolMap.has(name);
      })
      .map((name) => toolMap.get(name));
    if (group.length) {
      setToolState((state) => {
        const res = [...state];
        res.push(group as Tool[]);
        return res;
      })
    }
  });
}
