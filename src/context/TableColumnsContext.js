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
        { header: 'Loan End Date', key: 'loanEndDate' },
        { header: 'Days Overdue', key: 'daysOverdue' },
      ];  

    const centeredOverdueBooksTableColumns = ['id', 'loanStartDate', 'loanEndDate', 'daysOverdue'];

    const booksTableColumns = [
      { header: 'Image', key: 'imagePath' },
      { header: 'Title', key: 'name' },
      { header: 'Author', key: 'author' },
      { header: 'Release Year', key: 'yearOfRelease' },
      { header: 'Category', key: 'category' },
      { header: 'Amount', key: 'amount' },
      { header: 'Remaining Free', key: 'remainingFree' },
    ];  

  const centeredBooksTableColumns = ['imagePath', 'amount', 'remainingFree', 'yearOfRelease', 'category'];



    

    return(
        <TableColumnsContext.Provider value={{incomingBooksTableColumns, overdueBooksTableColumns, centeredOverdueBooksTableColumns, booksTableColumns, centeredBooksTableColumns}}>
             {children}
        </TableColumnsContext.Provider>
    );
};

export const useTableColumnsContext = () => useContext(TableColumnsContext);
export default TableColumnsContext;