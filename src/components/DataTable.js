import React from "react";

function DataTable({ tableColumns, tableData }) {
    return (
        <table className="data-table">
            <thead>
                    <tr>
                        {tableColumns.map((column, index) => (
                            <th
                            key={index}
                            className={column.key === 'id' || column.key === 'loanStartDate' || column.key === 'daysOverdue' ? 'center' : ''}
                            >
                            {column.header}
                            </th>
                        ))}
                    </tr>
            </thead>
            <tbody>
                    {tableData.map((rowData, rowIndex) => (
                        <tr key={rowIndex}>
                            {tableColumns.map((column, colIndex) => (
                                 <td key={colIndex} className={column.key === 'id' || column.key === 'loanStartDate' || column.key === 'daysOverdue' ? 'center' : ''}>
                                    {column.key === 'daysOverdue' ? (
                                        <span className={`daysOverdue ${rowData[column.key] > 100 ? 'red-warning' : 'yellow-warning'}`}>
                                            {rowData[column.key]}
                                        </span>
                                    ) : (
                                        rowData[column.key] 
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
        </table>
    );
}

export default DataTable;