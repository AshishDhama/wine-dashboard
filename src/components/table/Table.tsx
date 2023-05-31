import React, { Fragment } from 'react';

export type TableData = Record<string, string| number>;

export type  TableConfig = {
    header?:() => string;
    label: string,
    render: (value: TableData) =>  string | number,
    sortValue?: (value: TableData) => string,
  }[];


type Props = {
  data: TableData[];
  config: TableConfig;
  keyFn: (value: TableData) =>  string | number;
}

export function Table({ data, config, keyFn }: Props): JSX.Element {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }

    return <th key={column.label}>{column.label}</th>;
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="p-2" key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr className="border-b" key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    );
  });

  return (
    <table className="table-auto border-spacing-2">
      <thead>
        <tr className="border-b-2">{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}
