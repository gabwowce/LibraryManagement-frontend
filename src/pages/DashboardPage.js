import React from 'react';
import StatsMini from '../components/dashboard-components/StatsMini';
import StatsBig from '../components/dashboard-components/StatsBig';
import IncomingBooks from '../components/dashboard-components/IncomingBooks';

function DashboardPage() {
  return (
    <div className='dashboard-container'>

      <h1>Dashboard</h1>

      <div className='statistics'>
        <StatsMini/>
        <StatsMini/>
        <StatsMini/>
        <StatsMini/>
      </div>

      <StatsBig/>

      <IncomingBooks/>

    </div>
  );
}

export default DashboardPage;