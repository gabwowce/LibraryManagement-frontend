// src/components/MainLayout.jsx
import React from 'react';

import Header from '../components/Header';
import SidebarMenu from '../components/SidebarMenu';
import AppRoutes from '../routes/AppRoutes'

const MainLayout = () => {
  return (
    <div className="layout">
      <SidebarMenu/>
      <Header/>
        <main className="content">
            <AppRoutes />
        </main>
    </div>

  );
};

export default MainLayout;
