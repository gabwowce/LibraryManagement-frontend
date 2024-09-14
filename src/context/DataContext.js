import React, { createContext, useState, useEffect, useContext } from 'react';
import config from '../config';

export const DataContext = createContext();

export const DataProvider = ({children})=>{
    const [allData, setAllData] = useState(false);
    const [statsInfo, setStatsInfo] = useState([]);
    const [loanData, setloanData] = useState([]);

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

    useEffect(() => {
        fetchMiniStats();
        fetchLoanData();
    }, []);

    useEffect(() => {
        if (statsInfo.length > 0 || loanData.length > 0) {
            setAllData(true);
        }else {
            setAllData(false);
        }
    }, [statsInfo]);

    return(
        <DataContext.Provider value={{statsInfo, allData, loanData}}>
             {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);
export default DataContext;