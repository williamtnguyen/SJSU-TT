/* eslint-disable no-case-declarations */
import React from 'react';
import { Tag } from 'antd';
import {
  MeritStatusEnum,
  MeritOperationEnum,
} from '../../util/enums/merit-enums';

const StatusTag = ({ status, meritRequest }) => {
  switch (status) {
    case MeritStatusEnum.PENDING:
      return <Tag>PENDING</Tag>;
    case MeritStatusEnum.DISAPPROVED:
      return <Tag color="red">DISAPPROVED</Tag>;
    default:
      const meritAmountString =
        meritRequest.operation === MeritOperationEnum.MERIT
          ? `+${meritRequest.meritAmount}`
          : `-${meritRequest.meritAmount}`;
      return <Tag color="green">APPROVED: {meritAmountString}</Tag>;
  }
};

export default StatusTag;
