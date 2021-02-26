import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin } from 'antd';

const SubmittedRequests = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [requests, setRequests] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const apiResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/merits/requests/me`
      );
      setRequests(apiResponse.data);
    } catch (error) {
      setFetchError(true);
    }
    setIsFetching(false);
  };

  const tableColumns = [
    {
      title: 'Pledge Name',
      dataIndex: 'pledgeName',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];

  return (
    <>
      {isFetching ? (
        <Spin size="large" />
      ) : fetchError ? (
        <h1>Could not fetch submitted Requests.</h1>
      ) : (
        <Table columns={tableColumns} dataSource={requests} size="middle" />
      )}
    </>
  );
};

export default SubmittedRequests;
