import React, { useState } from 'react';
import { Table, Tabs } from 'antd';
import { MeritManagerTabEnum } from '../../util/enums/merit-enums';
import tableStyles from '../../styles/components/merit-manager-table.module.scss';

const { TabPane } = Tabs;

const MeritManagerTable = ({
  allMeritRequests,
  setSelectedTab,
  selectedMeritRequest,
  setSelectedMeritRequest,
}) => {
  const [selectedRowKeysArray, setSelectedRowKeysArray] = useState([]);

  const tableColumns = [
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
    },
  ];

  const handleChange = (event) => {
    setSelectedTab(event);
    setSelectedRowKeysArray([]);
    setSelectedMeritRequest({});
  };

  const rowSelection = {
    type: 'radio',
    selectedRowKeys: selectedRowKeysArray,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeysArray(selectedRowKeys);
      setSelectedMeritRequest(selectedRows[0]);
    },
  };

  return (
    <Tabs
      defaultActiveKey="pending"
      onChange={handleChange}
      key={selectedMeritRequest}
    >
      <TabPane
        tab={MeritManagerTabEnum.PENDING}
        key={MeritManagerTabEnum.PENDING}
      >
        <Table
          rowSelection={rowSelection}
          pagination={{ position: ['bottomLeft'] }}
          columns={tableColumns}
          dataSource={allMeritRequests.pending}
          size="middle"
        />
      </TabPane>
      <TabPane
        tab={MeritManagerTabEnum.DISPATCHED}
        key={MeritManagerTabEnum.DISPATCHED}
      >
        <Table
          rowSelection={rowSelection}
          pagination={{ position: ['bottomLeft'] }}
          columns={tableColumns}
          dataSource={allMeritRequests.dispatched}
          size="middle"
        />
      </TabPane>
    </Tabs>
  );
};

export default MeritManagerTable;
