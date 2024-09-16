import React, { createContext, useState, useEffect, useContext } from 'react';
import config from '../config';

export const DataContext = createContext();

export const DataProvider = ({children})=>{
    const [allData, setAllData] = useState(false);
    const [statsInfo, setStatsInfo] = useState([]);
    const [loanData, setloanData] = useState([]);
    const [incomingBooksData, setIncomingBooksData] = useState([]);
    const [overdueBooksData, setOverdueBooksData] = useState([]);

    const fetchMiniStats = async () =>{
        try {
            const response = await fetch(`${config.baseURL}/api/stats`);
            if (!response.ok){
                setAllData(false);
            }
            const data = await response.json();
            setStatsInfo(data);
        } catch (error) {
            console.error("Error fetching stats: ", error);
            setStatsInfo([]);
        }
    }

    const fetchLoanData = async () =>{
        try {
            const response = await fetch(`${config.baseURL}/api/loansData`);
            if (!response.ok){
                setAllData(false);
            }
            const data = await response.json();
            setloanData(data);
        } catch (error) {
            console.error("Error fetching loan data: ", error);
            setloanData([]);
        }
    }

    const fetchIncomingBooksData= async () =>{
        try {
            const response = await fetch(`${config.baseURL}/api/incomingBooks`);
            if (!response.ok){
                setIncomingBooksData(false);
            }
            const data = await response.json();
            setIncomingBooksData(data);
        } catch (error) {
            console.error("Error fetching IncomingBooksData: ", error);
            setIncomingBooksData([]);
        }
    }

    const fetchOverdueBooksData = async () => {
        try {
            const response = await fetch(`${config.baseURL}/api/books/overdue`);
            if (!response.ok) {
                setOverdueBooksData([]);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setOverdueBooksData(data);
        } catch (error) {
            console.error("Error fetching OverdueBooksData: ", error);
            setOverdueBooksData([]); 
        }
    }

    useEffect(() => {
        fetchMiniStats();
        fetchLoanData();
        fetchIncomingBooksData();
        fetchOverdueBooksData();
    }, []);

    useEffect(() => {
        if (statsInfo.length > 0 || loanData.length > 0 || incomingBooksData.length > 0 || overdueBooksData.length > 0)  {
            setAllData(true);
        }else {
            setAllData(false);
        }
    }, [statsInfo]);

    return(
        <DataContext.Provider value={{statsInfo, allData, loanData, incomingBooksData, overdueBooksData}}>
             {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);
export default DataContext;