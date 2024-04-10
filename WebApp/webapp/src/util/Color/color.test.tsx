import { perc2color } from "./color";

describe('perc2color', () => {
    it('should return correct color for given percentage', () => {
      expect(perc2color(0)).toBe('#ff0000'); // 0% should be red
      expect(perc2color(25)).toBe('#ff7f00'); // 25% should be orange
      expect(perc2color(50)).toBe('#ffff00'); // 50% should be yellow
      expect(perc2color(75)).toBe('#80ff00'); // 75% should be lime
      expect(perc2color(100)).toBe('#00ff00'); // 100% should be green
    });
  
    it('should handle negative percentages', () => {
      expect(perc2color(-25)).toBe('#ff0000'); // -25% should also be red
    });
  
    it('should handle percentages above 100', () => {
      expect(perc2color(125)).toBe('#00ff00'); // 125% should be green
    });
});