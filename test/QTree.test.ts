import QTree from "../src/core/data/QTree";

test("QTree", () => {
  const tree = new QTree({ x: 0, y: 0, width: 100, height: 100 });
  tree.insert([
    [0, 0],
    [5, 5],
  ]);
  expect(tree.objects).toStrictEqual([
    [0, 0],
    [5, 5],
  ]);
});
