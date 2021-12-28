import { addCellEventListener } from "../events";

addCellEventListener('click', (e) => {
  console.log(e.row.i, e.col.i);
})