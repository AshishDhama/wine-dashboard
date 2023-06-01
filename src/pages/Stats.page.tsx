import React, { useMemo} from 'react';
import wineData from '../wine-data.json';
import { Table } from '../components/table';
import { getMode, getMean, getMedian, getGamma, getGroupedData } from '../utils';
import { NumberOrStringRecord, WineTestRecord } from '../types';

function Stats(): JSX.Element {
  const dataGroup: WineTestRecord= useMemo( () => getGroupedData(wineData, 'Alcohol'), [wineData]);
  const configCol = useMemo(() => Object.keys(dataGroup).map((k) => ({
    label: `Class ${k}`,
    render: (v: Record<string, string | number>) => v[k],
  })), [dataGroup]);
  const config = useMemo(() => [
    {
      label: 'Measure',
      render: (v: Record<string, string | number>) => v.name,
    },
    ...configCol
  ], [configCol]);


  const flavnoidsMeanData:NumberOrStringRecord = { name: 'Flavanoids Mean' };
  const flavnoidsMedianData: NumberOrStringRecord= { name: 'Flavanoids Median' };
  const flavnoidsModeData:NumberOrStringRecord = { name: 'Flavanoids Mode' };

  const gammamMeanData:NumberOrStringRecord = { name: 'Gamma Mean' };
  const gammaMedianData: NumberOrStringRecord = { name: 'Gamma Median' };
  const gammaModeData: NumberOrStringRecord = { name: 'Gamma Mode' };
  Object.entries(dataGroup).forEach(([key, value]) => {
    const flavnoids = value.map((w) => w.Flavanoids);
    const gamma = value.map((w) => getGamma(w));
    flavnoidsMeanData[key] = getMean(flavnoids);
    flavnoidsMedianData[key] = getMedian(flavnoids);
    const flavnoidsMode =  getMode(flavnoids);
    flavnoidsModeData[key] = flavnoidsMode.join(', ') || 'All values are distinct';
    gammamMeanData[key] = getMean(gamma);
    gammaMedianData[key] = getMedian(gamma);
    const gammaMode =  getMode(gamma);
    gammaModeData[key] = gammaMode.join(', ') || 'All values are distinct';
  });
  const tableData: NumberOrStringRecord[] = [flavnoidsMeanData, flavnoidsMedianData, flavnoidsModeData];
  const gammaTableData: NumberOrStringRecord[] = [gammamMeanData, gammaMedianData, gammaModeData];

  const keyFn = (v: (typeof tableData)[0]) => v.name;

  return (
    <>
      <Table title="Flavanoids Stats" data={tableData} config={config} keyFn={keyFn} />
      <Table title="Gamma Stats" data={gammaTableData} config={config} keyFn={keyFn} />
    </>
  );
}

export default Stats;
