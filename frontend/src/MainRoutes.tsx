// MainRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebsiteApp from './App'
import DashboardApp from './Dashboard/DashboardApp';

function MainRoutes() {
  return (
    <Router>
      <Routes>
        
        {/* Routes from Landing App */}
        <Route path="/*" element={<WebsiteApp />} />

        {/* Routes from CMS App */}
        <Route path="/cms/*" element={<DashboardApp />} />
      </Routes>
    </Router>
  );
}

export default MainRoutes;
