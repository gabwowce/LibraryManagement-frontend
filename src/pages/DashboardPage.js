import React from 'react';
import { useState, useEffect } from 'react';
import StatsMini from '../components/dashboard-components/StatsMini';
import MyLineChart from '../components/dashboard-components/LineChart';
import IncomingBooks from '../components/dashboard-components/IncomingBooks';
import config from '../config';
import {useDataContext} from '../context/DataContext'
import LoadingPage from './LoadingPage';

function DashboardPage() {
  const {statsInfo} = useDataContext();
  console.log('statsInfo:', statsInfo); 

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

      {/* <IncomingBooks/> */}

    </div>
  );
}

export default DashboardPage;