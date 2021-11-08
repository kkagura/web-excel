import { EventEmitter } from "../src/core/data/EventEmitter";

describe("EventEmitter", () => {
  const p = new EventEmitter();

  it("on", () => {
    const cb = jest.fn();
    p.on("test", cb);
    expect(p.events.test.length).toBe(1);
  });

  it("emit", () => {
    const cb = jest.fn();
    p.on("test", cb);
    p.emit("test", "a", 1);
    expect(cb).toHaveBeenCalledWith("a", 1);
    expect(cb.mock.calls.length).toBe(1);
  });

  it("off", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    const cb3 = jest.fn();
    p.on("test", cb1);
    p.on("test", cb2);
    p.on("test3", cb3);
    p.emit("test");
    expect(cb1.mock.calls.length).toBe(1);
    expect(cb2.mock.calls.length).toBe(1);

    p.off("test", cb1);
    p.emit("test", cb1);
    expect(cb1.mock.calls.length).toBe(1);
    expect(cb2.mock.calls.length).toBe(2);

    p.off("test");
    p.emit("test");
    expect(cb1.mock.calls.length).toBe(1);
    expect(cb2.mock.calls.length).toBe(2);

    p.off();
    p.emit("test3");
    expect(cb3.mock.calls.length).toBe(0);
  });

  it("off", () => {
    const cb = jest.fn();
    p.once("test", cb);
    p.emit("test");
    expect(cb.mock.calls.length).toBe(1);
    p.emit("test");
    expect(cb.mock.calls.length).toBe(1);
  });
});
