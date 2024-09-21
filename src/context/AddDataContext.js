import React, { createContext, useState, useContext } from 'react';
import config from "../config";

export const AddDataContext = createContext();

export const AddDataProvider = ({ children }) => {
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const addNewMemberData = async (memberData) => {
    try {
      const response = await fetch(`${config.baseURL}/api/member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) {
        throw new Error('Failed to add member');
      }

      const data = await response.json();
      setConfirmationMessage('Member added successfully!'); 
    } catch (error) {
      console.error(error);
      setConfirmationMessage('Error adding member.');
    }
  };

  return (
    <AddDataContext.Provider value={{
      addNewMemberData,
      confirmationMessage,
    }}>
      {children}
    </AddDataContext.Provider>
  );
};

export const useAddDataContext = () => useContext(AddDataContext);
export default AddDataContext;
