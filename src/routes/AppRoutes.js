import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import OverdueBooksPage from '../pages/OverdueBooksPage';
import BooksPage from '../pages/BooksPage';
import MembersPage from '../pages/MembersPage';
import LoansPage from '../pages/LoansPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage/>} />
      <Route path="/overdue-books" element={<OverdueBooksPage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/loans" element={<LoansPage />} />
    </Routes>
  );
}

export default AppRoutes;