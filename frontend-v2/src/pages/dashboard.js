import React, { createContext, useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
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

  const [brotherData, setBrotherData] = useState({});
  const [selectedTabIndex, setSelectedTabIndex] = useState('accountOverview');
  const dashboardContext = {
    brotherData,
    setBrotherData,
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
      <>
        <Helmet>
          <title>Theta Tau | Dashboard</title>
          <meta
            name="description"
            content="Our website also serves as a dashboard for active members, pledges, and officers to handle internal operations. SJSU Theta Tau active members only."
          />
        </Helmet>

        <div className={dashboardStyles.root}>
          <div className={dashboardStyles.dashboard__container}>
            <DashboardContext.Provider value={dashboardContext}>
              <DashboardSidebar />
              <DashboardContent />
            </DashboardContext.Provider>
          </div>
        </div>
      </>
    ) : (
      <Redirect to="/login" />
    ))
  );
};

export default Dashboard;
