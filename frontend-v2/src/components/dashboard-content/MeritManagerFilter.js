import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, Spin, Switch, Divider } from 'antd';
import {
  LoadingOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import filterStyles from '../../styles/components/merit-manager-filter.module.scss';

import CURR_PLEDGE_CLASS from '../../util/curr-pledge-class';
const { Option } = Select;

const MeritManagerFilter = ({ queryFilter, setQueryFilter }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [pledges, setPledges] = useState([]);
  const [actives, setActives] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetchPledgesAndActives();
  }, []);

  const fetchPledgesAndActives = async () => {
    try {
      const pledgesResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/brothers/class/${CURR_PLEDGE_CLASS}`
      );
      setPledges(pledgesResponse.data.currentPledges);
      const activesResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/brothers/actives`
      );
      setActives(
        activesResponse.data.filter(
          (activeObject) => activeObject.pledgeClass !== CURR_PLEDGE_CLASS
        )
      );
    } catch (error) {
      setFetchError(true);
    }
    setIsFetching(false);
  };

  const setQueryFilterWrapper = (memberID, filterType) => {
    const idQueryString = !memberID ? '' : memberID;
    switch (filterType) {
      case FilterType.ACTIVE:
        return setQueryFilter({
          ...queryFilter,
          issuerID: idQueryString,
        });
      case FilterType.PLEDGE:
        return setQueryFilter({
          ...queryFilter,
          pledgeID: idQueryString,
        });
      default:
        return console.error('Unhandled filter type passed.');
    }
  };

  return (
    <>
      <div className={filterStyles.toggle__container}>
        <span className={filterStyles.toggle__label}>Filter by person(s):</span>
        <Switch
          onChange={(isExpanded) => setFilterExpanded(isExpanded)}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </div>
      {filterExpanded && (
        <>
          {isFetching ? (
            <Spin indicator={<LoadingOutlined spin />} />
          ) : fetchError ? (
            <h3>Could not fetch pledge and active filters.</h3>
          ) : (
            <div className={filterStyles.dropdowns__container}>
              <Divider />
              <Select
                placeholder="Filter merits by pledge"
                allowClear
                className={filterStyles.dropdown}
                onChange={(pledgeID) =>
                  setQueryFilterWrapper(pledgeID, FilterType.PLEDGE)
                }
              >
                {pledges.map((pledgeObject) => {
                  return (
                    // eslint-disable-next-line no-underscore-dangle
                    <Option key={pledgeObject.key} value={pledgeObject._id}>
                      {pledgeObject.name}
                    </Option>
                  );
                })}
              </Select>
              <Select
                placeholder="Filter merits by active"
                allowClear
                className={filterStyles.dropdown}
                onChange={(activeID) =>
                  setQueryFilterWrapper(activeID, FilterType.ACTIVE)
                }
              >
                {actives.map((activeObject) => {
                  return (
                    // eslint-disable-next-line no-underscore-dangle
                    <Option key={activeObject.key} value={activeObject._id}>
                      {activeObject.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
          )}
        </>
      )}
    </>
  );
};

export const FilterType = Object.freeze({
  PLEDGE: 'pledge',
  ACTIVE: 'active',
});

export default MeritManagerFilter;
