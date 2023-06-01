import React, { useMemo } from 'react';
import wineData from '../wine-data.json';
import { Table } from '../components/table';
import { getGroupedData, getTransformedData } from '../utils';
import { WineTestRecord } from '../types';

function Stats(): JSX.Element {
  const dataGroup: WineTestRecord = useMemo(() => getGroupedData(wineData, 'Alcohol'), [wineData]);
  const configCol = useMemo(
    () =>
      Object.keys(dataGroup).map((k) => ({
        label: `Class ${k}`,
        render: (v: Record<string, string | number>) => v[k],
      })),
    [dataGroup]
  );
  const config = useMemo(
    () => [
      {
        label: 'Measure',
        render: (v: Record<string, string | number>) => v.name,
      },
      ...configCol,
    ],
    [configCol]
  );

  const tableDatas = useMemo(() => getTransformedData(dataGroup), [dataGroup]);

  const keyFn = (v: (typeof tableDatas.flavnoidsTableData)[0]) => v.name;

  return (
    <>
      <Table title="Flavanoids Stats" data={tableDatas.flavnoidsTableData} config={config} keyFn={keyFn} />
      <Table title="Gamma Stats" data={tableDatas.gammaTableData} config={config} keyFn={keyFn} />
    </>
  );
}

export default Stats;
