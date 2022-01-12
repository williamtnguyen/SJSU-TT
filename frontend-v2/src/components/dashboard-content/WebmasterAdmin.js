import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Checkbox,
  Button,
  Table,
  Spin,
  Dropdown,
  Menu,
} from 'antd';
import { UploadOutlined, DownOutlined } from '@ant-design/icons';
import adminStyles from '../../styles/components/webmaster-admin.module.scss';

import {
  MajorEnum,
  PositionEnum,
  PledgeClassEnum,
} from '../../util/enums/brother-enums';
import thetaTauCrest from '../../images/theta-tau-crest-black.png';
const { Option } = Select;

const WebmasterAdmin = () => {
  // left table state
  // const [selectedTab, setSelectedTab] = useState('Actives');
  const [queryParams, setQueryParams] = useState({
    brotherType: 'Actives',
    pledgeClass: 'All',
  });
  const [isFetching, setIsFetching] = useState(true);
  const [brothers, setBrothers] = useState([]);
  const [selectedBrother, setSelectedBrother] = useState([]);

  useEffect(() => {
    fetchBrothers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const fetchBrothers = async () => {
    setIsFetching(true);
    const apiResponse = await axios.get(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/brothers/${queryParams.brotherType.toLowerCase()}`
    );
    setBrothers(apiResponse.data);
    setIsFetching(false);
  };

  const updateQueryParams = (key, value) => {
    setQueryParams({
      ...queryParams,
      [key]: value,
    });
  };

  const BrotherTypeDropdownMenu = () => {
    return (
      <Menu onClick={(itemEvent) => updateQueryParams('brotherType', itemEvent.key)}>
        <Menu.Item key="Actives">Actives</Menu.Item>
        <Menu.Item key="Alumni">Alumni</Menu.Item>
        <Menu.Item key="Inactives">Inactives</Menu.Item>
      </Menu>
    );
  };

  const PledgeClassDropDownMenu = () => {
    return (
      <Menu onClick={(itemEvent) => updateQueryParams('pledgeClass', itemEvent.key)}>
        {
          ['All'].concat(
            Object.values(PledgeClassEnum)
          ).map((pledgeClass) => (
            <Menu.Item key={pledgeClass}>{pledgeClass}</Menu.Item>
          ))
        }
      </Menu>
    );
  };

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Major',
      dataIndex: 'major',
    },
    {
      title: 'Pledge Class',
      dataIndex: 'pledgeClass',
    },
  ];

  return (
    <div className={adminStyles.root}>
      <Row gutter={32}>
        <Col sm={24} md={14}>
          <div className={adminStyles.content}>
            <div className={adminStyles.title}>
              <h1>
                <b>Webmaster </b>Admin
              </h1>
              <img src={thetaTauCrest} alt="theta-tau-crest" />
            </div>
            <p>Select a row to view/edit brother information.</p>

            <div className={adminStyles.dropdown__container}>
              <span className={adminStyles.dropdown__label__right}>Currently viewing</span>
              <Dropdown overlay={BrotherTypeDropdownMenu}>
                <Button shape="round">
                  {queryParams.brotherType} <DownOutlined />
                </Button>
              </Dropdown>
              <span className={`${adminStyles.dropdown__label__left} ${adminStyles.dropdown__label__right}`}>from</span>
              <Dropdown overlay={PledgeClassDropDownMenu}>
                <Button shape="round">
                  {queryParams.pledgeClass} <DownOutlined />
                </Button>
              </Dropdown>
              <span className={adminStyles.dropdown__label__left}>class</span>
            </div>

            {isFetching ? (
              <div className={adminStyles.spinner__container}>
                <Spin size="large" />
              </div>
            ) : (
              <Table columns={tableColumns} dataSource={brothers} size="middle"></Table>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WebmasterAdmin;
