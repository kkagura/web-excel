import { Component, createSignal, For, onMount } from "solid-js";
import { state } from "../../store";
import { Tool, toolState } from "../../store/tools";
import styles from "./index.module.less";

const Toolbar: Component = () => {
  onMount(() => {
    console.log(toolState);
  })
  return (
    <div class={styles.toolbar}>
      {
        <For each={toolState}>
          {(group) => (
            <div class={styles.toolGroup}>
              <For each={group}>{(tool) => renderToolItem(tool)}</For>
            </div>
          )}
        </For>
      }
    </div>
  );
};

function renderToolItem(tool: Tool) {
  if (tool.render) {
    return tool.render();
  }
  return (
    <div class={styles.toolItem} title={tool.name}>
      <i className="icon"></i>
    </div>
  );
}

export default Toolbar;
