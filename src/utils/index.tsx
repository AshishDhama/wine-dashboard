import { NumberOrStringRecord, WineTestRecord } from '../types';
import { WineTestStatsType } from '../types/wine-test-stats.type';

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
    // if all the values have frequency of 1 in that case mode can't be determined
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

export function getGamma(data: WineTestStatsType): number {
  const { Ash, Hue, Magnesium } = data;
  return (Ash * Hue) / Magnesium;
}

//
export function getGroupedData(
  data: WineTestStatsType[],
  key: keyof WineTestStatsType
): Record<number, WineTestStatsType[]> {
  const dataGroup: Record<number, WineTestStatsType[]> = {};
  data.forEach((alcoholClass: WineTestStatsType) => {
    const a = dataGroup[alcoholClass[key]];
    dataGroup[alcoholClass[key]] = a ? [...a, alcoholClass] : [alcoholClass];
  });
  return dataGroup;
}

export function getTransformedData(dataGroup: WineTestRecord) {
  const flavnoidsMeanData: NumberOrStringRecord = { name: 'Flavanoids Mean' };
  const flavnoidsMedianData: NumberOrStringRecord = { name: 'Flavanoids Median' };
  const flavnoidsModeData: NumberOrStringRecord = { name: 'Flavanoids Mode' };
  const gammamMeanData: NumberOrStringRecord = { name: 'Gamma Mean' };
  const gammaMedianData: NumberOrStringRecord = { name: 'Gamma Median' };
  const gammaModeData: NumberOrStringRecord = { name: 'Gamma Mode' };
  Object.entries(dataGroup).forEach(([key, value]) => {
    const flavnoids = value.map((w) => w.Flavanoids);
    const gamma = value.map((w) => getGamma(w));
    flavnoidsMeanData[key] = getMean(flavnoids);
    flavnoidsMedianData[key] = getMedian(flavnoids);
    const flavnoidsMode = getMode(flavnoids);
    flavnoidsModeData[key] = flavnoidsMode.join(', ') || 'All values are distinct';
    gammamMeanData[key] = getMean(gamma);
    gammaMedianData[key] = getMedian(gamma);
    const gammaMode = getMode(gamma);
    gammaModeData[key] = gammaMode.join(', ') || 'All values are distinct';
  });
  return {
    flavnoidsTableData: [flavnoidsMeanData, flavnoidsMedianData, flavnoidsModeData],
    gammaTableData: [gammamMeanData, gammaMedianData, gammaModeData],
  };
}
