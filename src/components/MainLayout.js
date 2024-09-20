// src/components/MainLayout.jsx
import React, { useEffect } from 'react';

import Header from '../components/Header';
import SidebarMenu from '../components/SidebarMenu';
import AppRoutes from '../routes/AppRoutes'
import LoadingPage from '../pages/LoadingPage';
import ToSmallScreenPage from '../pages/ToSmallScreenPage';
import { useDataContext } from '../context/DataContext';
import {useScreenWidthContext} from '../context/ScreenWidthContext'

const MainLayout = () => {
  const {allData} = useDataContext();
  const {screenWidth} = useScreenWidthContext();


  return (

    allData ? 
    (
      screenWidth>1130 ?  
      
      (
        <div className="layout">
        <SidebarMenu/>
        <Header/>
          <main className="content">
              <AppRoutes />
          </main>
      </div>
      ) 

      : 

      (
        <ToSmallScreenPage/>
      )
      
    ) 
    
    : 
    
    (
      <LoadingPage/>
    )


  );
};

export default MainLayout;
