import React, { createContext, useState, useEffect, useContext } from 'react';
import config from '../config';

export const DataByIdContext = createContext();

export const DataByIdProvider = ({children})=>{
    const [allDataById, setallDataById] = useState(false);
    const [memberData, setmemberData] = useState([]);
    const [bookData, setbookData] = useState([]);
    const [overdueBookData, setOverdueBookData] = useState({});


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
    

    const fetchBookDataById = async (bookID) =>{
        try {
            const response = await fetch(`${config.baseURL}/api/books/${bookID}`);
            if (!response.ok){
                allDataById(false);
            }
            const data = await response.json();
            setbookData(data);
        } catch (error) {
            console.error("Error fetching BookDataById: ", error);
            setbookData([]);
        }
    }
    

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
            console.error("Error fetching BookDataById: ", error);
            setOverdueBookData({});
        }
    }

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