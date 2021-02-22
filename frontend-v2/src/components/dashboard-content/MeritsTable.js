/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin } from 'antd';
import meritStyles from '../../styles/components/merits-table.module.scss';

import CURR_PLEDGE_CLASS from '../../util/curr-pledge-class';

const MeritsTable = () => {
  const [noPledgeClass, setNoPledgeClass] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [pledges, setPledges] = useState([]);
  const [currUserIsPledge, setCurrUserIsPledge] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (CURR_PLEDGE_CLASS) {
      fetchPledges();
    } else {
      setNoPledgeClass(true);
    }
  }, []);

  const fetchPledges = async () => {
    try {
      const apiResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/brothers/class/${CURR_PLEDGE_CLASS}`
      );
      setPledges(apiResponse.data.currentPledges);
      setCurrUserIsPledge(
        apiResponse.data.userPledgeClass === CURR_PLEDGE_CLASS
      );
    } catch (error) {
      setFetchError(true);
    }
    setIsFetching(false);
  };

  const tableColumns = currUserIsPledge
    ? [
        {
          title: 'Student ID',
          dataIndex: 'studentID',
        },
        {
          title: 'Merit Count',
          dataIndex: 'meritCount',
        },
      ]
    : [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Student ID',
          dataIndex: 'studentID',
        },
        {
          title: 'Merit Count',
          dataIndex: 'meritCount',
        },
      ];

  return (
    <div className={meritStyles.root}>
      {isFetching ? (
        <Spin size="large" />
      ) : noPledgeClass ? (
        <h1>No pledge class at the moment.</h1>
      ) : fetchError ? (
        <h1>Could not fetch {CURR_PLEDGE_CLASS} merits.</h1>
      ) : (
        <div>
          <h1 className={meritStyles.title}>
            <b>{CURR_PLEDGE_CLASS}</b> class merit table
          </h1>
          <Table columns={tableColumns} dataSource={pledges} size="middle" />
        </div>
      )}
    </div>
  );
};

export default MeritsTable;
