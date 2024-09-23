import React, { createContext, useState, useContext } from 'react';
import config from "../config";

export const AddDataContext = createContext();

export const AddDataProvider = ({ children }) => {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  
  const addNewMemberData = async (memberData) => {
    try {
      const response = await fetch(`${config.baseURL}/api/members/member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) {
        throw new Error('Failed to add member');
      }

      setConfirmationMessage('Member added successfully!'); 
      setTimeout(() => {
        setConfirmationMessage(''); 
      }, 10000); 

      const data = await response.json();
     
    } catch (error) {
      console.error(error);
      setErrorMessage('Error adding member.');
    }
  };


  const addNewBookData = async (bookData) => {
    try {
      const response = await fetch(`${config.baseURL}/api/books/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      setConfirmationMessage('Book added successfully!'); 
      setTimeout(() => {
        setConfirmationMessage(''); 
      }, 10000); 

      const data = await response.json();
      
    } catch (error) {
      console.error(error);
      setErrorMessage('Error adding book.');
    }
  };

  const addNewLoanData = async (loanData) => {
    try {
      const response = await fetch(`${config.baseURL}/api/loans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loanData),
      });

      if (!response.ok) {
        throw new Error('Failed to add loan');
      }

      setConfirmationMessage('Loan added successfully!'); 
      setTimeout(() => {
        setConfirmationMessage(''); 
      }, 10000); 

      const data = await response.json();
      
    } catch (error) {
      console.error(error);
      setErrorMessage('Error adding loan.');
    }
  };

  return (
    <AddDataContext.Provider value={{
      addNewBookData,
      addNewMemberData,
      addNewLoanData,
      confirmationMessage,
      setConfirmationMessage, 
      ErrorMessage
    }}>
      {children}
    </AddDataContext.Provider>
  );
};

export const useAddDataContext = () => useContext(AddDataContext);
export default AddDataContext;
