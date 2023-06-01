import { WineTestStatsType } from "./wine-test-stats.type";

export type WineTestRecord  = Record<number, WineTestStatsType[]> ;

export type NumberOrStringRecord  = Record<string | number, string | number>  ;
