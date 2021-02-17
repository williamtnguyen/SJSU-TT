import React, { useContext } from 'react';
import { Menu } from 'antd';
import { UserOutlined, CodeOutlined, SmileOutlined } from '@ant-design/icons';
import { DashboardContext } from '../pages/dashboard';

const { SubMenu } = Menu;

const DashboardSidebar = () => {
  const { setSelectedTabIndex } = useContext(DashboardContext);

  const setDashboardContent = (event) => {
    setSelectedTabIndex(event.key);
  };

  return (
    <Menu
      onClick={setDashboardContent}
      style={{ width: 256, borderRadius: '10px 0 0 10px' }}
      defaultSelectedKeys={['accountOverview']}
      defaultOpenKeys={['activeMemberFunctions']}
      mode="inline"
    >
      <SubMenu
        key="activeMemberFunctions"
        icon={<UserOutlined />}
        title="Active Member Functions"
      >
        <Menu.Item key="accountOverview">Account overview</Menu.Item>
        <Menu.Item key="editProfile">Edit your profile</Menu.Item>
        <Menu.Item key="meritTable">Pledge merits table</Menu.Item>
        <Menu.Item key="meritForm">Pledge merit form</Menu.Item>
        <Menu.Item key="calendar">Event calendar</Menu.Item>
      </SubMenu>
      <SubMenu
        key="webmasterFunctions"
        icon={<CodeOutlined />}
        title="Webmaster Functions"
      >
        <Menu.Item key="register">Register a brother</Menu.Item>
      </SubMenu>
      <SubMenu
        key="pledgeParentFunctions"
        icon={<SmileOutlined />}
        title="Pledge Parent Functions"
      >
        <Menu.Item key="meritManager">Pledge merit manager</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default DashboardSidebar;
