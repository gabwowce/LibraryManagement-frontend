import React from "react";

function DataTable({ tableColumns, tableData }) {
    return (
        <table className="data-table">
                <thead>
                    <tr>
                        {tableColumns.map((column, index) => (
                            <th key={index}>{column.header}</th> 
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((rowData, rowIndex) => (
                        <tr key={rowIndex}>
                            {tableColumns.map((column, colIndex) => (
                                <td key={colIndex}>{rowData[column.key]}</td> 
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        
    );
}

export default DataTable;
