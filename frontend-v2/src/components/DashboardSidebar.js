import React, { useContext } from 'react';
import { Menu } from 'antd';
import { UserOutlined, CodeOutlined, SmileOutlined } from '@ant-design/icons';
import { DashboardContext } from '../pages/dashboard';
import { PositionEnum } from '../util/enums/brother-enums';
import CURR_PLEDGE_CLASS from '../util/curr-pledge-class';

const { SubMenu } = Menu;

const DashboardSidebar = () => {
  const { setSelectedTabIndex, brotherData } = useContext(DashboardContext);

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
        {!isCurrentlyPledging(brotherData.pledgeClass) && (
          <Menu.Item key="meritRequest">Submit a merit request</Menu.Item>
        )}
        <Menu.Item key="calendar">Event calendar</Menu.Item>
      </SubMenu>

      {positionHasFeature(PositionEnum.WEBMASTER, brotherData.position) && (
        <SubMenu
          key="webmasterFunctions"
          icon={<CodeOutlined />}
          title="Webmaster Functions"
        >
          <Menu.Item key="register">Register a brother</Menu.Item>
        </SubMenu>
      )}

      {positionHasFeature(PositionEnum.PLEDGE_PARENT, brotherData.position) && (
        <SubMenu
          key="pledgeParentFunctions"
          icon={<SmileOutlined />}
          title="Pledge Parent Functions"
        >
          <Menu.Item key="meritManager">Pledge merit manager</Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
};

/**
 * Tells if the logged in user can view a TaskBar item with expectedPosition
 * @param {*} expectedPosition the position that can use the TaskBar item
 * @param {*} actualPosition the actual position of the logged in user
 */
const positionHasFeature = (expectedPosition, actualPosition) => {
  return (
    actualPosition === PositionEnum.WEBMASTER ||
    actualPosition === expectedPosition
  );
};

const isCurrentlyPledging = (pledgeClass) => {
  return pledgeClass === CURR_PLEDGE_CLASS;
};

export default DashboardSidebar;
