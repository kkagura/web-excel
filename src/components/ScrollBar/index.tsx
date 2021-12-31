import { Component } from "solid-js";
import styles from "./index.module.less";

interface Props {
  direction?: "v" | "h";
  total: number;
  value: number;
  onScroll?: () => void;
  min?: number;
  $container: HTMLElement;
}

const ScrollBar: Component<Props> = (props) => {
  let { direction = "v", total, value, onScroll, min = 0, $container } = props;
  // const height = (value / total) * $container.getBoundingClientRect().height;
  const height = 0;
  const style = {
    top: min + "px",
    height: height + "px",
  };
  return (
    <div
      classList={{
        [styles.scrollBar]: true,
        [styles.vertical]: direction === "v",
      }}
      style={style}
    ></div>
  );
};

export default ScrollBar;
