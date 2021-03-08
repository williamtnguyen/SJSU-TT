import React, { useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import MeritForm from './MeritForm';
import SubmittedRequests from './SubmittedRequests';
import requestStyles from '../../styles/components/merit-request.module.scss';
import thetaTauCrest from '../../images/theta-tau-crest-black.png';

const { TabPane } = Tabs;

const MeritRequest = () => {
  const [selectedTab, setSelectedTab] = useState('meritForm');

  return (
    <div className={requestStyles.root}>
      <Row className={requestStyles.row}>
        <Col sm={24} md={selectedTab === 'meritForm' ? 12 : 24}>
          <div className={requestStyles.title}>
            <h1>Merit Request</h1>
            <img src={thetaTauCrest} alt="theta-tau-crest" />
          </div>
          <Tabs
            defaultActiveKey="meritForm"
            onChange={(activeKey) => setSelectedTab(activeKey)}
          >
            <TabPane tab="Merit Form" key="meritForm">
              <MeritForm />
            </TabPane>
            <TabPane tab="Submitted Requests" key="submittedRequests">
              <SubmittedRequests />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default MeritRequest;
