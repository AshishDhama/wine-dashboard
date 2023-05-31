import React from 'react';
import wineData from '../wine-data.json'
import {Table} from '../components/table';
import {getMode, getMean, getMedian, getGamma} from '../utils/utils';
import { AlcoholCompostion } from '../types/alcohol-compostion';


function FlavanoidsDetails(): JSX.Element  {
    const config = [
        {
          label: 'Measure',
          render: (v: Record<string, string| number>) => v.name,
        },
      ];
    const dataGroup: Record<number, AlcoholCompostion[]> = {}
    wineData.forEach((alcoholClass:AlcoholCompostion) => {
      const a = dataGroup[alcoholClass.Alcohol];
      dataGroup[alcoholClass.Alcohol] = a ? [...a,alcoholClass] : [alcoholClass];
      if(!a){
        config.push({
            label: `Class ${alcoholClass.Alcohol}`,
            render: (v: Record<string, string| number>) => v[alcoholClass.Alcohol],
          });
      }
    })
    const meanData: Record<string | number, string | number> = {name: 'Flavanoids Mean'}
    const medianData: Record<string | number, string | number> = {name: 'Flavanoids Median'}
    const modeData: Record<string | number, string | number> = {name: 'Flavanoids Mode'}

    const gammamMeanData: Record<string | number, string | number> = {name: 'Gamma Mean'}
    const gammaMedianData: Record<string | number, string | number> = {name: 'Gamma Median'}
    const gammaModeData: Record<string | number, string | number> = {name: 'Gamma Mode'}
    Object.entries(dataGroup).forEach((c) => {
        const aclass = c[0];
        const flavnoids = c[1].map(w => w.Flavanoids);
        const gamma =  c[1].map(w => getGamma(w))
        meanData[aclass]= getMean(flavnoids);
        medianData[aclass]= getMedian(flavnoids);
        modeData[aclass] = getMode(flavnoids).join(', ') || 'All values are distinct';
        gammamMeanData[aclass]= getMean(gamma);
        gammaMedianData[aclass]= getMedian(gamma);
        gammaModeData[aclass] = getMode(gamma).join(', ') || 'All values are distinct';
    
    });
    const tableData: Record<string, string| number>[] = [meanData, medianData, modeData];
    const gammaTableData: Record<string, string| number>[] = [gammamMeanData, gammaMedianData, gammaModeData];


  const keyFn = (v: typeof tableData[0]) => v.name;

  return (
    <div>
      <Table data={tableData} config={config} keyFn={keyFn} />
      <Table data={gammaTableData} config={config} keyFn={keyFn} />
    </div>
  );
}

export default FlavanoidsDetails;
