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
    


    const fetchMemberDataById = async (memberID) => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await fetch(`${config.baseURL}/api/members/${memberID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                setallDataById(false);
            }
            const data = await response.json();
            setmemberData(data);
        } catch (error) {
            console.error("Error fetching MemberDataById: ", error);
            setmemberData([]);
        }
    };
    

    const fetchBookDataById = async (bookID) => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await fetch(`${config.baseURL}/api/books/${bookID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
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
    

    const fetchOverdueBookDataById = async (loanID) => {
        try {
            const token = localStorage.getItem('token'); 
            console.error("-------> fetching BookDataById. loanID: ", loanID);
            const response = await fetch(`${config.baseURL}/api/books/overdue/${loanID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                setallDataById(false);
            }
            const data = await response.json();
            setOverdueBookData(data);
            console.error(" fetching BookDataById. OverdueBookData " + data);
        } catch (error) {
            console.error("Error fetching overdueBookDataById: ", error);
            setOverdueBookData({});
        }
    };

    const deleteMember = async (memberID) => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await fetch(`${config.baseURL}/api/members/check-member-loans/${memberID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch loans data');
            }
    
            const hasActiveLoans = await response.json();
            
            if (hasActiveLoans) {
                setErrorMessage("Member has active loans and cannot be deleted.");
                setTimeout(() => {
                    setErrorMessage(''); 
                }, 10000);
                return { success: false };
            } 
    
            const deleteResponse = await fetch(`${config.baseURL}/api/members/${memberID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
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
            const token = localStorage.getItem('token'); 
            const response = await fetch(`${config.baseURL}/api/books/check-loans/${bookID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch loans data');
            }
    
            const hasActiveLoans = await response.json();
    
            if (hasActiveLoans) {
                setErrorMessage("Book cannot be deleted as it has active loans.");
                setTimeout(() => {
                    setErrorMessage('');
                }, 10000); 
                return { success: false };
            }
    
            const deleteResponse = await fetch(`${config.baseURL}/api/books/${bookID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
    
            if (!deleteResponse.ok) {
                throw new Error('Failed to delete book');
            }
    
            setConfirmationMessage("Book deleted successfully.");
            setErrorMessage('');
            setTimeout(() => {
                setConfirmationMessage('');
            }, 10000); 
            return { success: true };
    
        } catch (error) {
            console.error("Error deleting book: ", error);
            setErrorMessage("An error occurred while deleting the book.");
            setConfirmationMessage('');
            setTimeout(() => {
                setErrorMessage('');
            }, 10000); 
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