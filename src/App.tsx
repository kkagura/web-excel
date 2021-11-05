import { Component, createSignal } from "solid-js";

const worker = new Worker("src/worker.ts");

import logo from "./logo.svg";
import styles from "./App.module.css";

const App: Component = () => {
  const [getText, setText] = createSignal("text");
  const fn = (e: InputEvent) => {
    const { value } = e.target as HTMLInputElement;
    setText(value);
    worker.postMessage(value);
  };
  return (
    <div>
      <input type="text" value={getText()} onInput={fn} />
      <input type="text" value={getText()} />
    </div>
  );
};

export default App;
