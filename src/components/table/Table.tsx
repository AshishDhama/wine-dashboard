import React, { Fragment } from 'react';

import './table.css'

export type TableData = Record<string, string| number>;

export type  TableConfig = {
    header?:() => string;
    label: string,
    render: (value: TableData) =>  string | number,
    sortValue?: (value: TableData) => string,
  }[];


type Props = {
  title: string;
  data: TableData[];
  config: TableConfig;
  keyFn: (value: TableData) =>  string | number;
}

export function Table({ data, title, config, keyFn }: Props): JSX.Element {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }

    return <th key={column.label}>{column.label}</th>;
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    );
  });

  return (
    <div className='table-wrapper'>
    <table>
    <caption>{title}</caption>
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
    </div>
  );
}
