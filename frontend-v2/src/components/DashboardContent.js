import React, { useContext } from 'react';
import { DashboardContext } from '../pages/dashboard';

import AccountOverview from './dashboard-content/AccountOverview';
import EditProfile from './dashboard-content/EditProfile';
import MeritsTable from './dashboard-content/MeritsTable';
import MeritRequest from './dashboard-content/MeritRequest';
import EventCalendar from './dashboard-content/EventCalendar';
import Register from './dashboard-content/Register';
import WebmasterAdmin from './dashboard-content/WebmasterAdmin';
import MeritManager from './dashboard-content/MeritManager';

const ContentMap = {
  accountOverview: <AccountOverview />,
  editProfile: <EditProfile />,
  meritTable: <MeritsTable />,
  meritRequest: <MeritRequest />,
  calendar: <EventCalendar />,
  register: <Register />,
  webmasterAdmin: <WebmasterAdmin />,
  meritManager: <MeritManager />,
};

const DashboardContent = () => {
  const { selectedTabIndex } = useContext(DashboardContext);

  return ContentMap[selectedTabIndex];
};

export default DashboardContent;
