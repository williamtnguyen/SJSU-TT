/* eslint-disable indent */
import React from 'react';
import { Table, Tabs } from 'antd';
import { MeritManagerTabEnum } from '../../util/enums/merit-enums';
import { operationTags, statusTags } from '../../util/table-tags';
import tableStyles from '../../styles/components/merit-manager-table.module.scss';

const { TabPane } = Tabs;

const MeritManagerTable = ({
  allMeritRequests,
  selectedTab,
  setSelectedTab,
  setIsModalVisible,
  selectedMeritRequest,
  setSelectedMeritRequest,
}) => {
  const tableColumns =
    selectedTab === MeritManagerTabEnum.PENDING
      ? [
          {
            title: 'Pledge',
            dataIndex: 'pledgeName',
          },
          {
            title: 'Issuer',
            dataIndex: 'issuerName',
          },
          {
            title: 'Operation',
            dataIndex: 'operation',
            render: (operation) => operationTags[operation],
          },
          {
            title: 'Submission Date',
            dataIndex: 'submissionDate',
          },
        ]
      : [
          {
            title: 'Pledge',
            dataIndex: 'pledgeName',
          },
          {
            title: 'Issuer',
            dataIndex: 'issuerName',
          },
          {
            title: 'Operation',
            dataIndex: 'operation',
            render: (operation) => operationTags[operation],
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => statusTags[status],
          },
          {
            title: 'Submission Date',
            dataIndex: 'submissionDate',
          },
          {
            title: 'Dispatch Date',
            dataIndex: 'dispatchDate',
          },
        ];

  const handleChange = (event) => {
    setSelectedTab(event);
    setSelectedMeritRequest({});
  };

  return (
    <Tabs
      defaultActiveKey={selectedTab}
      onChange={handleChange}
      key={selectedMeritRequest}
    >
      <TabPane
        tab={MeritManagerTabEnum.PENDING}
        key={MeritManagerTabEnum.PENDING}
      >
        <Table
          onRow={(record) => ({
            onClick: () => {
              setIsModalVisible(true);
              setSelectedMeritRequest(record);
            },
          })}
          columns={tableColumns}
          dataSource={allMeritRequests.pending}
          size="middle"
          className={tableStyles.table}
        />
      </TabPane>
      <TabPane
        tab={MeritManagerTabEnum.DISPATCHED}
        key={MeritManagerTabEnum.DISPATCHED}
      >
        <Table
          onRow={(record) => ({
            onClick: () => {
              setIsModalVisible(true);
              setSelectedMeritRequest(record);
            },
          })}
          columns={tableColumns}
          dataSource={allMeritRequests.dispatched}
          size="middle"
          className={tableStyles.table}
        />
      </TabPane>
    </Tabs>
  );
};

export default MeritManagerTable;
