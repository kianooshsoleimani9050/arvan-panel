import { Table } from "react-bootstrap";
import { CustomTablePropsType } from "../@types/components/CustomTable.model";

export const CustomTable = ({
  columns,
  rows,
  loading,
}: CustomTablePropsType) => (
  <div className="position-relative">
    {loading && (
      <div className="table-loading-container d-flex align-items-center justify-content-center">
        Loading...
      </div>
    )}
    <Table responsive className="custom-table">
      <thead className="bg-light">
        <tr>
          <th>#</th>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const rowsWantedData = columns.map((column) => {
            if (column.renderer) {
              return column.renderer(row);
            }
            // this section have capability to handle nested or dot separated objects
            // but the logic of that doesn't applies here
            return row[column.key] || "";
          });
          return (
            <tr key={row.id}>
              <td>{index + 1}</td>
              {rowsWantedData.map((rowWantedData, indexOfWantedData) => (
                <td key={`cell${row.id}${indexOfWantedData}`}>
                  {rowWantedData}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  </div>
);
