import React from "react";

function IncomingBooksDataTable({ tableColumns, tableData }) {
    return (
        <div className="incbooks-table-container">
            <h2 className='incbooks-table-title'>Incoming Books</h2>
            <table className="incbooks-data-table">
                <thead>
                    <tr>
                        {tableColumns.map((column, index) => (
                            <th
                            key={index}
                            className={column.key === 'amount' || column.key === 'status' ? 'center' : ''}
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
                                 <td key={colIndex} className={column.key === 'amount' || column.key === 'status' ? 'center' : ''}>
                                    {column.key === 'status' ? (
                                        <span className={`status ${rowData[column.key]}`}>
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
        </div>
        
    );
}

export default IncomingBooksDataTable;
