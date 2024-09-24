import React from 'react';
import { useState, useEffect } from 'react';
import StatsMini from '../components/dashboard-components/StatsMini';
import DataTable from '../components/DataTable';
import MyLineChart from '../components/dashboard-components/LineChart';
import {useDataContext} from '../context/DataContext'
import LoadingPage from './LoadingPage';
import { useTableColumnsContext } from '../context/TableColumnsContext';
import IncomingBooksDataTable from '../components/IncomingBooksDataTable';


function DashboardPage() {
  const {statsInfo, incomingBooksData} = useDataContext();
  const {incomingBooksTableColumns} = useTableColumnsContext();


  return (
    <div className='dashboard-container'>

      <h1>Dashboard</h1>

      <div className='stats-container'>
        {
             statsInfo ? 
            (
              statsInfo.map((stat)=>(
              <StatsMini key={stat.title} totalInfo={stat}/>
              ))

            ) 
            : 
            (
              <LoadingPage/>
            )
        }
       
        
      </div>

      <MyLineChart/>
      
      <IncomingBooksDataTable tableColumns={incomingBooksTableColumns} tableData={incomingBooksData}/>
      

    </div>
  );
}

export default DashboardPage;