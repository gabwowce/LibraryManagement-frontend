import React, { createContext, useState, useEffect, useContext } from 'react';
import config from '../config';

export const DataByIdContext = createContext();

export const DataByIdProvider = ({children})=>{
    const [allDataById, setallDataById] = useState(false);
    const [memberData, setmemberData] = useState([]);
    const [bookData, setbookData] = useState([]);
    const [overdueBookData, setOverdueBookData] = useState({});

    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const fetchMemberDataById = async (memberID) =>{
        try {
            const response = await fetch(`${config.baseURL}/api/members/${memberID}`);
            if (!response.ok){
                allDataById(false);
            }
            const data = await response.json();
            setmemberData(data);
        } catch (error) {
            console.error("Error fetching MemberDataById: ", error);
            setmemberData([]);
        }
    }
    

    const fetchBookDataById = async (bookID) => {
        try {
            const response = await fetch(`${config.baseURL}/api/books/${bookID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book data');
            }
            const data = await response.json();
            setbookData(data);
            return data; 
        } catch (error) {
            console.error("Error fetching BookDataById: ", error);
            setbookData({});
            return {}; 
        }
    };
    

    const fetchOverdueBookDataById = async (loanID) =>{
        try {
            console.error("-------> fetching BookDataById. loanID: ", loanID);
            const response = await fetch(`${config.baseURL}/api/books/overdue/${loanID}`);
            if (!response.ok){
                allDataById(false);
            }
            const data = await response.json();
            setOverdueBookData(data);
            console.error(" fetching BookDataById. OverdueBookData " + data);
        } catch (error) {
            console.error("Error fetching overdueBookDataById: ", error);
            setOverdueBookData({});
        }
    }

    const deleteMember = async (memberID) => {
        try {
            // Patikriname, ar narys turi aktyvių paskolų
            const response = await fetch(`${config.baseURL}/api/members/check-member-loans/${memberID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch loans data');
            }
            
            const hasActiveLoans = await response.json();
            
            if (hasActiveLoans) { // Patikrinkite, ar narys turi aktyvių paskolų
                setErrorMessage("Member has active loans and cannot be deleted.");
                setTimeout(() => {
                    setErrorMessage(''); 
                }, 10000); // 10 sekundžių taimeris
                return { success: false };
            } 
            
            // Jei narys neturi paskolų, bandome jį ištrinti
            const deleteResponse = await fetch(`${config.baseURL}/api/members/${memberID}`, {
                method: 'DELETE',
            });
    
            if (!deleteResponse.ok) {
                throw new Error('Failed to delete member');
            }
    
        
            setConfirmationMessage("Member deleted successfully.");
            setErrorMessage(''); 
            setTimeout(() => {
                setConfirmationMessage('');
            }, 10000); 
            return { success: true };
    
        } catch (error) {
            console.error("Error deleting member: ", error);
            setErrorMessage("An error occurred while deleting the member.");
            setConfirmationMessage(''); 
            setTimeout(() => {
                setErrorMessage('');
            }, 10000); 
            return { success: false };
        }
    };

    const deleteBook = async (bookID) => {
        try {
            // Check if the book is currently loaned out
            const response = await fetch(`${config.baseURL}/api/books/check-loans/${bookID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch loans data');
            }

            const hasActiveLoans = await response.json();

            if (hasActiveLoans) {
                setErrorMessage("Book cannot be deleted as it has active loans.");
                setTimeout(() => {
                    setErrorMessage('');
                }, 10000); // Clear after 10 seconds
                return { success: false };
            }

            // If the book is not loaned, attempt to delete it
            const deleteResponse = await fetch(`${config.baseURL}/api/books/${bookID}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error('Failed to delete book');
            }

            setConfirmationMessage("Book deleted successfully.");
            setErrorMessage('');
            setTimeout(() => {
                setConfirmationMessage('');
            }, 10000); // Clear after 10 seconds
            return { success: true };

        } catch (error) {
            console.error("Error deleting book: ", error);
            setErrorMessage("An error occurred while deleting the book.");
            setConfirmationMessage('');
            setTimeout(() => {
                setErrorMessage('');
            }, 10000); // Clear after 10 seconds
            return { success: false };
        }
    };
    
    

    useEffect(() => {
        if (memberData.length > 0 || bookData.length >0 || overdueBookData.length >0)  {
            setallDataById(true);
        }else {
            setallDataById(false);
        }
    }, [allDataById]);

    return(
        <DataByIdContext.Provider value={{
            allDataById,
            memberData,
            bookData,
            overdueBookData,
            deleteMember,
            deleteBook, 
            confirmationMessage,
            errorMessage,
            fetchMemberDataById,
            fetchBookDataById,
            fetchOverdueBookDataById
                                        }}>
             {children}
        </DataByIdContext.Provider>
    );
};

export const useDataByIdContext = () => useContext(DataByIdContext);
export default DataByIdContext;