import { AlcoholCompostion } from '../types/alcohol-compostion';

export function getMode(numbers: number[]): number[] {
  // as result can be bimodal or multi-modal,
  // the returned result is provided as an array
  // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
  const modes: number[] = [];
  const count: Record<number, number> = {};
  let maxIndex = 0;

  numbers.forEach((number) => {
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  });

  Object.keys(count).forEach((value) => {
    const number = +value;
    if (count[number] && count[number] === maxIndex && maxIndex > 1) {
      const mode = +number.toFixed(3);
      modes.push(mode);
    }
  });
  return modes;
}

export function getMedian(numbers: number[]): number {
  // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
  let median = 0;
  const numsLen = numbers.length;
  numbers.sort();

  if (
    numsLen % 2 ===
    0 // is even
  ) {
    // average of two middle numbers
    median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
  } else {
    // is odd
    // middle number only
    median = numbers[(numsLen - 1) / 2];
  }

  return +median.toFixed(3);
}

export function getMean(numbers: number[]): number {
  return +(numbers.reduce((acc, val) => acc + val, 0) / numbers.length).toFixed(3);
}

export function getGamma(data: AlcoholCompostion): number {
  const { Ash, Hue, Magnesium } = data;
  return (Ash * Hue) / Magnesium;
}
