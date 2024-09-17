import React, { useState, useEffect } from "react";
import {useScreenWidthContext} from '../context/ScreenWidthContext'

function DataTable({ tableColumns, tableData }) {
    const {screenWidth} = useScreenWidthContext();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setrowsPerPage] = useState(null);

    const totalRows = tableData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
    const currentRows = tableData.slice(startIndex, endIndex);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    useEffect(()=>{
        screenWidth < 1874 ? setrowsPerPage(9) : setrowsPerPage(12);
    },[screenWidth]);

    return (
        <div className="data-table-container">
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
                        {currentRows.map((rowData, rowIndex) => (
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

            {
                totalRows > 9 && 

                <div className="data-table-page-navigation">
                    <div className="pagination-info">
                            Showing {startIndex + 1}-{endIndex} of {totalRows}
                    </div>
                    <div className="pagination-controls">
                        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                            {"<"} 
                        </button>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                             {">"}
                        </button>
                    </div>
                </div>
            }

           

            
        </div>
       
    );
}

export default DataTable;
