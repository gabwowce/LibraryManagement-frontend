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
    
        // Siųskite, tik jei bodyData nėra tuščias
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
    
        const bodyData = new FormData();
        bodyData.append("name", updatedData.name || "");
        bodyData.append("surname", updatedData.surname || "");
        bodyData.append("dateOfBirth", updatedData.dateOfBirth || "");
        bodyData.append("phoneNumber", updatedData.phoneNumber || "");
    
        // Siųskite, tik jei bodyData nėra tuščias
        if (Object.keys(bodyData).length > 0) {
            try {
                const response = await fetch(`${config.baseURL}/api/members/member/${memberID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bodyData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update member data');
                }
    
                const message = `Member ID: ${memberID} information updated successfully!`;

                setConfirmationMessage(message);
                setTimeout(() => setConfirmationMessage(''), 10000);
            } catch (error) {
                console.error("Error updating member data:", error);
            }
        } else {
            console.log('No data to send.');
        }
    };
    
    

    return (
        <UpdateDataContext.Provider value={{
            updateOverdueBookData,
            updateMemberData,
            confirmationMessage
        }}>
            {children}
        </UpdateDataContext.Provider>
    );
};

export const useUpdateDataContext = () => useContext(UpdateDataContext);
export default UpdateDataContext;