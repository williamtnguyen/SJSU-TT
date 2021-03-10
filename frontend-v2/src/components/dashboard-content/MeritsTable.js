/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Statistic } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import meritStyles from '../../styles/components/merits-table.module.scss';

import CURR_PLEDGE_CLASS from '../../util/curr-pledge-class';
import PLEDGE_PROCESS_END_DATE from '../../util/pledge-process-end-date';

const { Countdown } = Statistic;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

          <div className={meritStyles.statistics}>
            <Countdown
              title="Countdown to end of pledge process:"
              value={PLEDGE_PROCESS_END_DATE}
              format="D:HH:mm:ss"
            />
            <Statistic
              title="Pledges currently eligible to cross:"
              value={pledges.filter((pledge) => pledge.meritCount >= 10).length}
              prefix={<UserOutlined />}
              suffix={`/ ${pledges.length}`}
            />
          </div>

          <Table columns={tableColumns} dataSource={pledges} size="middle" />
        </div>
      )}
    </div>
  );
};

export default MeritsTable;
