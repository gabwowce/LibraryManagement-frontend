import React, { createContext, useState, useEffect, useContext } from 'react';

export const TableColumnsContext = createContext();

export const TableColumnsProvider = ({children})=>{
    const incomingBooksTableColumns = [
        { header: 'Title', key: 'title' },
        { header: 'Author', key: 'author' },
        { header: 'Release Year', key: 'releaseYear' },
        { header: 'Price', key: 'price' },
        { header: 'Amount', key: 'amount' },
        { header: 'Status', key: 'status' },
      ];

    const overdueBooksTableColumns = [
        { header: 'Book ID', key: 'id' },
        { header: 'Title', key: 'title' },
        { header: 'Author', key: 'author' },
        { header: 'Borrower Name', key: 'borrowerName' },
        { header: 'Loan Start Date', key: 'loanStartDate' },
        { header: 'Days Overdue', key: 'daysOverdue' },
      ];  
    

    return(
        <TableColumnsContext.Provider value={{incomingBooksTableColumns, overdueBooksTableColumns}}>
             {children}
        </TableColumnsContext.Provider>
    );
};

export const useTableColumnsContext = () => useContext(TableColumnsContext);
export default TableColumnsContext;