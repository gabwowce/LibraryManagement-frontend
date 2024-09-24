import React, { createContext, useState, useEffect, useContext } from 'react';
import config from '../config';

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [allData, setAllData] = useState(false);
    const [statsInfo, setStatsInfo] = useState([]);
    const [loanData, setLoanData] = useState([]);
    const [incomingBooksData, setIncomingBooksData] = useState([]);
    const [overdueBooksData, setOverdueBooksData] = useState([]);
    const [booksData, setBooksData] = useState([]);
    const [membersData, setMembersData] = useState([]);
    const [adminsAndManagersData, setAdminsAndManagersData] = useState([]);


    const fetchWithToken = async (url) => {
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response;
    };

    const fetchMiniStats = async () => {
        try {
            const response = await fetchWithToken(`${config.baseURL}/api/stats`);
            if (!response.ok) {
                setAllData(false);
            }
            const data = await response.json();
            setStatsInfo(data);
        } catch (error) {
            console.error("Error fetching stats: ", error);
            setStatsInfo([]);
        }
    }

    const fetchLoanData = async () => {
        try {
            const response = await fetchWithToken(`${config.baseURL}/api/loansData`);
            if (!response.ok) {
                setAllData(false);
            }
            const data = await response.json();
            setLoanData(data);
        } catch (error) {
            console.error("Error fetching loan data: ", error);
            setLoanData([]);
        }
    }

    const fetchIncomingBooksData = async () => {
        try {
            const response = await fetchWithToken(`${config.baseURL}/api/incomingBooks`);
            if (!response.ok) {
                setAllData(false);
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
            const response = await fetchWithToken(`${config.baseURL}/api/books/overdue`);
            if (!response.ok) {
                setAllData([]);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setOverdueBooksData(data);
        } catch (error) {
            console.error("Error fetching OverdueBooksData: ", error);
            setOverdueBooksData([]); 
        }
    }

    const fetchBooksData = async () => {
        try {
            const response = await fetchWithToken(`${config.baseURL}/api/books`);
            if (!response.ok) {
                setAllData([]);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBooksData(data);
        } catch (error) {
            console.error("Error fetching BooksData: ", error);
            setBooksData([]); 
        }
    }

    

    const fetchMembersData = async () => {
        try {
            const response = await fetchWithToken(`${config.baseURL}/api/members`);
            if (!response.ok) {
                setAllData([]);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMembersData(data);
        } catch (error) {
            console.error("Error fetching MembersData: ", error);
            setMembersData([]); 
        }
    }

    const fetchAdminsAndManagersData = async () => {
        try {
            const response = await fetchWithToken(`${config.baseURL}/api/members/admins&managers`);
            if (!response.ok) {
                setAllData([]);
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAdminsAndManagersData(data);
            console.log("---->AdminsAndManagersData" + JSON.stringify(data));
        } catch (error) {
            console.error("Error fetching AdminsAndManagersData: ", error);
            setAdminsAndManagersData([]); 
        }
    }

    useEffect(() => {
        fetchMiniStats();
        fetchLoanData();
        fetchIncomingBooksData();
        fetchOverdueBooksData();
        fetchBooksData();
        fetchMembersData();
        fetchAdminsAndManagersData();
    }, []);

    useEffect(() => {
        if (statsInfo.length > 0 
            || loanData.length > 0 
            || incomingBooksData.length > 0 
            || overdueBooksData.length > 0 
            || booksData.length > 0
            || membersData.length > 0
            || adminsAndManagersData.length > 0)  {
            setAllData(true);
        } else {
            setAllData(false);
        }
    }, [statsInfo]);

    return (
        <DataContext.Provider value={{
            statsInfo, 
            allData, 
            loanData, 
            incomingBooksData, 
            overdueBooksData, 
            booksData,
            membersData,
            adminsAndManagersData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);
export default DataContext;
