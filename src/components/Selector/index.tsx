import { Component } from "solid-js";
import { toLogicalRect } from "../../core/store";
import { getRangerViewRect, Ranger } from "../../core/store/ranger";
import styles from "./index.module.less";

const Selector: Component<{ ranger: Ranger }> = (props) => {
  const { ranger } = props;
  const { x, y, width, height } = toLogicalRect(getRangerViewRect(ranger));
  const style = {
    top: y + "px",
    left: x + "px",
    width: width + "px",
    height: height + "px",
  };
  return <div class={styles.selector} style={style}></div>;
};

export default Selector;
