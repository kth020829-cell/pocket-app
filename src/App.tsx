import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { HomePage } from './pages/HomePage';
import { AddExpensePage } from './pages/AddExpensePage';
import { HistoryPage } from './pages/HistoryPage';
import { StatsPage } from './pages/StatsPage';
import { GoalsPage } from './pages/GoalsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="add" element={<AddExpensePage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
