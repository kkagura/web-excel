import { Component, createSignal, onMount } from "solid-js";
import styles from "./App.module.css";
import WebExcel from "./core";

const App: Component = () => {
  let $container: any = null;
  onMount(() => {
    new WebExcel({ el: $container as HTMLElement });
  });
  return (
    <div class={styles.mainContainer}>
      <div
        ref={$container as HTMLDivElement}
        class={styles.excelContainer}
      ></div>
    </div>
  );
};

export default App;
