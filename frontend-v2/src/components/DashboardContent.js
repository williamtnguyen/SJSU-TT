import React, { useContext } from 'react';
import { DashboardContext } from '../pages/dashboard';
import AccountOverview from './dashboard-content/AccountOverview';
import EditProfile from './dashboard-content/EditProfile';

const ContentMap = {
  accountOverview: <AccountOverview />,
  editProfile: <EditProfile />,
  meritTable: <h1>Merits Table</h1>,
  meritForm: <h1>Merits Forms</h1>,
  calendar: <h1>Calendar</h1>,
  register: <h1>Register</h1>,
  meritManager: <h1>Merit Manager</h1>,
};

const DashboardContent = () => {
  const { selectedTabIndex } = useContext(DashboardContext);

  return ContentMap[selectedTabIndex];
};

export default DashboardContent;
