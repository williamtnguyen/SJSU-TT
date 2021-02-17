import React, { useContext } from 'react';
import { DashboardContext } from '../pages/dashboard';

const ContentMap = {
  accountOverview: <h1>Account Overview</h1>,
  editProfile: <h1>Edit Profile</h1>,
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
