import { isNaN, isNumber, toNumber } from "../src/core/utils/utils";

test("utils", () => {

  expect(isNaN(NaN)).toBe(true);

  expect(isNaN(1)).toBe(false);
  
  expect(isNumber(1)).toBe(true);
  
  expect(isNumber(NaN)).toBe(false);
  
  expect(isNumber('1')).toBe(false);

  expect(toNumber("10")).toBe(10);

  expect(toNumber("10.00")).toBe(10);

  expect(toNumber("10.123")).toBe(10.123);

  expect(toNumber("10.123", 2)).toBe(10.12);

  expect(toNumber(NaN)).toBe(0);

});
