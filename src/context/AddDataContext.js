import React, { createContext, useState, useContext } from 'react';
import config from "../config";

export const AddDataContext = createContext();

export const AddDataProvider = ({ children }) => {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  
  const addNewMemberData = async (memberData) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${config.baseURL}/api/members/member`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
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

  const addNewManagerData = async (managerData) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${config.baseURL}/api/members/manager`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(managerData),
      });

      if (!response.ok) {
        throw new Error('Failed to add manager');
      }

      setConfirmationMessage('Manager added successfully!'); 
      setTimeout(() => {
        setConfirmationMessage(''); 
      }, 10000); 

      const data = await response.json();
     
    } catch (error) {
      console.error(error);
      setErrorMessage('Error adding manager.');
    }
  };


  const addNewBookData = async (bookData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.baseURL}/api/books/book`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
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
    console.log("--->newloanData: " + JSON.stringify(loanData));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.baseURL}/api/loans`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
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
      addNewManagerData,
      confirmationMessage,
      setConfirmationMessage, 
      errorMessage
    }}>
      {children}
    </AddDataContext.Provider>
  );
};

export const useAddDataContext = () => useContext(AddDataContext);
export default AddDataContext;
