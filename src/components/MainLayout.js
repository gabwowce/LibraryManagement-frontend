
import React, { useEffect } from 'react';

import Header from '../components/Header';
import SidebarMenu from '../components/SidebarMenu';
import AppRoutes from '../routes/AppRoutes'
import LoadingPage from '../pages/LoadingPage';
import ToSmallScreenPage from '../pages/ToSmallScreenPage';
import { useDataContext } from '../context/DataContext';
import {useScreenWidthContext} from '../context/ScreenWidthContext'
import LoginPage from '../pages/LoginPage';
import { useAuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';


const MainLayout = () => {
  const {allData} = useDataContext();
  const {user} = useAuthContext();
  const {screenWidth} = useScreenWidthContext();
  const location = useLocation(); 


  

  if (!allData) {
    return <LoadingPage />;
  }

  return (
        user ? (
        screenWidth > 1257 ? (
          <div className="layout">
            <SidebarMenu />
            <Header />
            <main className="content">
              <AppRoutes />
            </main>
          </div>
        ) : (
          <ToSmallScreenPage />
        )
      )
      : 
      (
        <LoginPage/>
      )


  );
  
};

export default MainLayout;
