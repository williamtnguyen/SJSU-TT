import React, { createContext, useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardContent from '../components/DashboardContent';
import dashboardStyles from '../styles/pages/dashboard.module.scss';

export const DashboardContext = createContext();

const Dashboard = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState('accountOverview');
  const dashboardContext = {
    selectedTabIndex,
    setSelectedTabIndex,
  };

  return (
    <div className={dashboardStyles.root}>
      <h1>Active Member Dashboard</h1>

      <div className={dashboardStyles.dashboard__parent}>
        <DashboardContext.Provider value={dashboardContext}>
          <DashboardSidebar />
          <DashboardContent />
        </DashboardContext.Provider>
      </div>
    </div>
  );
};

export default Dashboard;
