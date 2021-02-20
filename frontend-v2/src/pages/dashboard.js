import React, { createContext, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { UserContext } from '../contexts/UserContext';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardContent from '../components/DashboardContent';
import dashboardStyles from '../styles/pages/dashboard.module.scss';

export const DashboardContext = createContext();

/**
 * Dashboard component is private, must be authenticated, else redirects to login
 */
const Dashboard = () => {
  const [didMount, setDidMount] = useState(false);
  const { isAuthenticated } = useContext(UserContext);

  const [selectedTabIndex, setSelectedTabIndex] = useState('accountOverview');
  const dashboardContext = {
    selectedTabIndex,
    setSelectedTabIndex,
  };

  useEffect(() => {
    // Run twice to wait for UserContext to update 'isAuthenticated' state
    if (!didMount) {
      setDidMount(true);
    }
  }, [didMount]);

  return (
    didMount &&
    (isAuthenticated ? (
      <div className={dashboardStyles.root}>
        <h1>
          <UserOutlined className={dashboardStyles.heading__icon} />
          Active Member Dashboard
        </h1>

        <div className={dashboardStyles.dashboard__container}>
          <DashboardContext.Provider value={dashboardContext}>
            <DashboardSidebar />
            <DashboardContent />
          </DashboardContext.Provider>
        </div>
      </div>
    ) : (
      <Redirect to="/login" />
    ))
  );
};

export default Dashboard;
