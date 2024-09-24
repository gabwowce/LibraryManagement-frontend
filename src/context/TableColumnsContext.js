import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuthContext } from '../context/AuthContext';

export const TableColumnsContext = createContext();

export const TableColumnsProvider = ({children})=>{
  const {user} = useAuthContext();

    const incomingBooksTableColumns = [
        { header: 'Title', key: 'title' },
        { header: 'Author', key: 'author' },
        { header: 'Release Year', key: 'releaseYear' },
        { header: 'Price', key: 'price' },
        { header: 'Amount', key: 'amount' },
        { header: 'Status', key: 'status' },
      ];

    const overdueBooksTableColumns = [
        { header: 'ID', key: 'id' },
        { header: 'Title', key: 'title' },
        { header: 'Author', key: 'author' },
        { header: 'Borrower Name', key: 'borrowerName' },
        { header: 'Start Date', key: 'loanStartDate' },
        { header: 'End Date', key: 'loanEndDate' },
        { header: 'Days Overdue', key: 'daysOverdue' },
      ];  

      if (user && user.role === 'admin') {
        overdueBooksTableColumns.push({ header: 'Actions', key: 'action' });
    }

    const centeredOverdueBooksTableColumns = ['id', 'loanStartDate', 'loanEndDate', 'daysOverdue', 'action'];

    const booksTableColumns = [
      { header: 'ID', key: 'id' },
      { header: 'Image', key: 'imagePath' },
      { header: 'Title', key: 'name' },
      { header: 'Author', key: 'author' },
      { header: 'Release Year', key: 'yearOfRelease' },
      { header: 'Category', key: 'category' },
      { header: 'Amount', key: 'amount' },
      { header: 'Remaining Free', key: 'remainingFree' },
  
    ];  
    if (user && user.role === 'admin') {
      booksTableColumns.push({ header: 'Actions', key: 'action' });
  }
    

  const centeredBooksTableColumns = ['id', 'imagePath', 'amount', 'remainingFree', 'yearOfRelease', 'category', 'action'];


  const membersTableColumns = [
    { header: 'ID', key: 'id' },
    { header: 'Name', key: 'name' },
    { header: 'Surname', key: 'surname' },
    { header: 'Date Of Birth', key: 'dateOfBirth' },
    { header: 'Phone Number', key: 'phoneNumber' },
    { header: 'Books Loaned', key: 'loans' },
    { header: 'Actions', key: 'action' },
  ];  

const centeredMembersTableColumns = ['dateOfBirth', 'loans', 'phoneNumber', 'name', 'surname', 'action', 'id'];

const managersTableColumns = [
  { header: 'ID', key: 'id' },
  { header: 'Name', key: 'name' },
  { header: 'Surname', key: 'surname' },
  { header: 'Date Of Birth', key: 'dateOfBirth' },
  { header: 'Phone Number', key: 'phoneNumber' },
  { header: 'Books Loaned', key: 'loans' },
  { header: 'Role', key: 'role' },
  
];  
if (user && user.role === 'admin') {
  managersTableColumns.push({ header: 'Actions', key: 'action' });
}

const centeredManagersTableColumns = ['dateOfBirth', 'loans', 'phoneNumber', 'name', 'surname', 'action', 'id', 'role'];


    

    return(
        <TableColumnsContext.Provider value={{
                                              incomingBooksTableColumns, 
                                              overdueBooksTableColumns, 
                                              centeredOverdueBooksTableColumns, 
                                              booksTableColumns, 
                                              centeredBooksTableColumns,
                                              membersTableColumns,
                                              centeredMembersTableColumns,
                                              managersTableColumns,
                                              centeredManagersTableColumns
                                              }}>
             {children}
        </TableColumnsContext.Provider>
    );
};

export const useTableColumnsContext = () => useContext(TableColumnsContext);
export default TableColumnsContext;