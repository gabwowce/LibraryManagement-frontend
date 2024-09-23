import React, { createContext, useState, useContext } from 'react';
import config from '../config';
import { useDataByIdContext } from './DataByIdContext';

export const UpdateDataContext = createContext();

export const UpdateDataProvider = ({ children }) => {
    const {fetchOverdueBookDataById} = useDataByIdContext();
    const [confirmationMessage, setConfirmationMessage] = useState('');
    

    const updateOverdueBookData = async (loanID, updatedData) => {
        console.log('Sending data:', updatedData);
    
        const bodyData = {};
        if (updatedData.newEndDate) {
            bodyData.newEndDate = updatedData.newEndDate;
        }else{
            bodyData.newEndDate = "";
        }
        if (updatedData.status) {
            bodyData.status = updatedData.status;
        }else{
            bodyData.status = "";
        }
    

        if (Object.keys(bodyData).length > 0) {
            try {
                const response = await fetch(`${config.baseURL}/api/books/overdue/${loanID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bodyData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update overdue book data');
                }
    
                const messageParts = [`Overdue book ID: ${loanID} updated successfully!`];
                if (updatedData.newEndDate) {
                    messageParts.push(`New End Date: ${updatedData.newEndDate}`);
                }
                if (updatedData.status) {
                    messageParts.push(`Status: ${updatedData.status}`);
                }
    
                setConfirmationMessage(messageParts.join(' '));
                await fetchOverdueBookDataById(loanID);
    
                setTimeout(() => setConfirmationMessage(''), 10000);
            } catch (error) {
                console.error("Error updating overdue book data:", error);
            }
        } else {
            console.log('No data to send.');
        }
    };


    const updateMemberData = async (memberID, updatedData) => {

        if (Object.keys(updatedData).length > 0) {
            try {
                const response = await fetch(`${config.baseURL}/api/members/member/${memberID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update member data');
                }
    
                const message = `Information for member with ID: ${memberID} updated successfully!`;

                setConfirmationMessage(message);
                setTimeout(() => setConfirmationMessage(''), 100000);
            } catch (error) {
                console.error("Error updating member data:", error);
            }
        } else {
            console.log('No data to send.');
        }
    };
    

    const returnBook = async (loanId, status) => {
        const queryParams = new URLSearchParams({ newStatus: status }).toString();
    
        try {
            const response = await fetch(`${config.baseURL}/api/loans/${loanId}?${queryParams}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to update loan status');
            }
    
            const message = `Loan ID: ${loanId} updated successfully! Status: ${status}`;
            setConfirmationMessage(message);
            setTimeout(() => setConfirmationMessage(''), 10000);
        } catch (error) {
            console.error("Error updating loan status:", error);
        }
    };


    const updateBookData = async (bookID, updatedData) => {

        if (Object.keys(updatedData).length > 0) {
            try {
                const response = await fetch(`${config.baseURL}/api/books/book/${bookID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update book data');
                }
    
                const message = `Information of book with ID: ${bookID} updated successfully!`;

                setConfirmationMessage(message);
                setTimeout(() => setConfirmationMessage(''), 100000);
            } catch (error) {
                console.error("Error updating book data:", error);
            }
        } else {
            console.log('No data to send.');
        }
    };
    
    
    

    return (
        <UpdateDataContext.Provider value={{
            updateOverdueBookData,
            updateMemberData,
            returnBook,
            updateBookData,
            confirmationMessage,
            setConfirmationMessage 
        }}>
            {children}
        </UpdateDataContext.Provider>
    );
};

export const useUpdateDataContext = () => useContext(UpdateDataContext);
export default UpdateDataContext;
