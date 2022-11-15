import { ReactNode } from "react";

export type CustomTableRowType<T = {}> = {
  id: string;
  [key: string]: any;
} & T;

export type CustomTableRowsType = CustomTableRowType[];

export type CustomTableColumnType = {
  key: string;
  header: string;
  renderer?: (row: CustomTableRowType<any>) => string | Element | ReactNode;
};

export type CustomTableColumnsType = CustomTableColumnType[];

export type CustomTablePropsType = {
  columns: CustomTableColumnsType;
  rows: CustomTableRowsType;
  loading: boolean;
};
