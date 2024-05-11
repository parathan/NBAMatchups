import { multby100 } from "./math";

describe('multby100 function', () => {
    it('should multiply the number by 100', () => {
      expect(multby100(0.5)).toBe(50);
      expect(multby100(2)).toBe(200);
      expect(multby100(-3)).toBe(-300);
      expect(multby100(0)).toBe(0);
    });
  
    it('should round the result to one decimal place', () => {
      expect(multby100(0.123)).toBe(12.3);
      expect(multby100(0.789)).toBe(78.9);
      expect(multby100(1.234)).toBe(123.4);
      expect(multby100(-1.234)).toBe(-123.4);
    });
});