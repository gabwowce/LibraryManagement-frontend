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
    

    return(
        <TableColumnsContext.Provider value={{incomingBooksTableColumns}}>
             {children}
        </TableColumnsContext.Provider>
    );
};

export const useTableColumnsContext = () => useContext(TableColumnsContext);
export default TableColumnsContext;