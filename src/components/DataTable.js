import React, { useState, useEffect } from "react";
import { useScreenWidthContext } from '../context/ScreenWidthContext';

function DataTable({ tableColumns, tableData, centeredColumns, renderCell }) {
    const { screenWidth } = useScreenWidthContext();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(null);

    const totalRows = tableData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
    const currentRows = tableData.slice(startIndex, endIndex);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        window.scrollTo(0, 0);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        setRowsPerPage(screenWidth < 1874 ? 9 : 12);
    }, [screenWidth]);

    return (
        totalRows > 0 ? (
            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            {tableColumns.map((column, index) => (
                                <th
                                    key={index}
                                    className={centeredColumns.includes(column.key) ? 'center' : ''}
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
                                    <td
                                        key={colIndex}
                                        className={centeredColumns.includes(column.key) ? 'center' : ''}
                                    >
                                        {renderCell ? renderCell(column.key, rowData) : rowData[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {totalRows > 9 && (
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
                )}
            </div>
        ) : (
            <div className="no-data">
                <h2>No Data Found</h2>
            </div>
        )
    );
}

export default DataTable;
