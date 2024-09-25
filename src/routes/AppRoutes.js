import React from 'react';
import { Route, Routes  } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import OverdueBooksPage from '../pages/OverdueBooksPage';
import BooksPage from '../pages/BooksPage';
import MembersPage from '../pages/MembersPage';
import ManagersPage from '../pages/ManagersPage';
import LoginPage from '../pages/LoginPage'; 
import PrivateRoute from './PrivateRoute'; 
import { useAuthContext } from '../context/AuthContext';

function AppRoutes({ setIsValidPage }) { 
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {(user && (user.role === 'admin' || user.role === 'manager')) && (
        <>
          <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/overdue-books" element={<PrivateRoute><OverdueBooksPage /></PrivateRoute>} />
          <Route path="/books" element={<PrivateRoute><BooksPage /></PrivateRoute>} />
          <Route path="/members" element={<PrivateRoute><MembersPage /></PrivateRoute>} />
          <Route path="/managers" element={<PrivateRoute><ManagersPage /></PrivateRoute>} />
        </>
      )}

      {user && user.role === 'member' && (
        <Route path="/books" element={<PrivateRoute><BooksPage /></PrivateRoute>} />
      )}


    </Routes>
  );
}

export default AppRoutes;
